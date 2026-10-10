import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';
import { AiServiceError } from '../utils/errors.js';

class AiService {
  constructor() {
    this.anthropicClient = null;
    this.geminiClient = null;

    if (env.GEMINI_API_KEY) {
      try {
        this.geminiClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
      } catch (err) {
        console.warn('[AI Service] Failed to initialize Gemini client:', err.message);
      }
    }

    if (env.ANTHROPIC_API_KEY) {
      try {
        this.anthropicClient = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
      } catch (err) {
        console.warn('[AI Service] Failed to initialize Anthropic client:', err.message);
      }
    }
  }

  /**
   * Safely extracts and parses JSON from raw LLM responses
   */
  extractJson(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('Response is empty or not a string.');
    }

    let text = rawText.trim();

    // 1. Remove markdown fences (```json ... ``` or ``` ...)
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
      text = codeBlockMatch[1].trim();
    }

    // 2. Find opening and closing curly braces or brackets
    const firstBrace = text.indexOf('{');
    const firstBracket = text.indexOf('[');
    
    let startIndex = -1;
    let endIndex = -1;

    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startIndex = firstBrace;
      endIndex = text.lastIndexOf('}');
    } else if (firstBracket !== -1) {
      startIndex = firstBracket;
      endIndex = text.lastIndexOf(']');
    }

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.slice(startIndex, endIndex + 1);
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      try {
        const cleaned = text.replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(cleaned);
      } catch {
        throw new Error(`Failed to parse AI output as JSON: ${parseError.message}`);
      }
    }
  }

  /**
   * Sends prompt to configured LLM (Gemini or Claude) with timeout and schema validation
   */
  async generateStructuredJson(prompt, schema, options = {}) {
    const timeoutMs = options.timeoutMs || env.AI_TIMEOUT_MS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let rawOutput = '';

    try {
      // 1. Priority 1: Gemini API if key is present
      if (env.GEMINI_API_KEY) {
        if (!this.geminiClient) {
          this.geminiClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
        }

        const modelName = options.geminiModel || env.GEMINI_MODEL || 'gemini-2.5-flash';
        
        try {
          const geminiResponse = await this.geminiClient.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          });

          rawOutput = geminiResponse.text;
        } catch (geminiError) {
          // If Gemini fails and Claude is available, fallback to Claude
          if (env.ANTHROPIC_API_KEY) {
            console.warn('[AI Service] Gemini call failed, falling back to Claude:', geminiError.message);
            rawOutput = await this.callClaude(prompt, options, controller);
          } else {
            throw geminiError;
          }
        }
      }
      // 2. Priority 2: Anthropic Claude API
      else if (env.ANTHROPIC_API_KEY) {
        rawOutput = await this.callClaude(prompt, options, controller);
      } else {
        throw new AiServiceError('No active AI API key configured (GEMINI_API_KEY or ANTHROPIC_API_KEY required).', null, 503);
      }

      clearTimeout(timeoutId);

      const parsedJson = this.extractJson(rawOutput);

      // Validate against Zod schema
      const validated = schema.safeParse(parsedJson);
      if (validated.success) {
        return validated.data;
      }

      console.warn('[AI Service] Initial response failed schema validation. Attempting corrective parse...');
      return schema.parse(parsedJson);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError' || error.message?.includes('aborted')) {
        throw new AiServiceError(`AI request timed out after ${timeoutMs}ms.`, null, 504);
      }

      if (error instanceof AiServiceError) {
        throw error;
      }

      throw new AiServiceError(`AI inference failed: ${error.message}`, error, 502);
    }
  }

  async callClaude(prompt, options, controller) {
    if (!this.anthropicClient) {
      this.anthropicClient = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    }

    const model = options.claudeModel || env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
    const maxTokens = options.maxTokens || 4096;

    const response = await this.anthropicClient.messages.create(
      {
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      },
      { signal: controller.signal }
    );

    const contentBlock = response.content?.[0];
    if (!contentBlock || contentBlock.type !== 'text') {
      throw new AiServiceError('Anthropic API returned an unexpected response format.', null, 502);
    }

    return contentBlock.text;
  }
}

export const aiService = new AiService();
