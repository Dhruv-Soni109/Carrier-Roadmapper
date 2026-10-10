import { ZodError } from 'zod';
import { AppError } from '../utils/errors.js';
import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return errorResponse(
      res,
      400,
      'VALIDATION_FAILED',
      'The request payload failed schema validation.',
      errorDetails
    );
  }

  // 2. Custom AppErrors (BadRequest, NotFound, GraphValidationError, AiServiceError, etc.)
  if (err instanceof AppError) {
    return errorResponse(
      res,
      err.statusCode,
      err.code,
      err.message,
      err.details
    );
  }

  // 3. SyntaxError (malformed JSON body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(
      res,
      400,
      'INVALID_JSON',
      'The request body contains invalid JSON.'
    );
  }

  // 4. Log unexpected internal errors safely on server
  console.error(`[Unhandled Error] [Req: ${res.locals?.requestId || 'none'}]:`, err.message || err);

  // 5. Generic sanitized response (never leak stack trace or internal server details)
  return errorResponse(
    res,
    500,
    'INTERNAL_SERVER_ERROR',
    'An unexpected internal server error occurred. Please try again later.'
  );
};
