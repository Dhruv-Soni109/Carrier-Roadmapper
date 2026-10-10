import { env } from '../config/env.js';

class MemoryCacheService {
  constructor(ttlMs = env.CACHE_TTL_MS, maxEntries = env.CACHE_MAX_ENTRIES) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.cache = new Map();
  }

  /**
   * Generates a normalized cache key from prefix and data
   */
  generateKey(prefix, data) {
    if (typeof data === 'string') {
      return `${prefix}:${data.toLowerCase().trim()}`;
    }
    try {
      // Deterministic sorted stringify
      const sorted = Object.keys(data)
        .sort()
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});
      return `${prefix}:${JSON.stringify(sorted).toLowerCase()}`;
    } catch {
      return `${prefix}:${String(data)}`;
    }
  }

  /**
   * Retrieves a cached item if not expired
   */
  get(key) {
    if (!this.cache.has(key)) return null;

    const entry = this.cache.get(key);
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresh position for LRU
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Sets an item with TTL
   */
  set(key, value, customTtl = this.ttlMs) {
    // If capacity reached, remove the oldest (first) item
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + customTtl,
      createdAt: Date.now(),
    });
  }

  /**
   * Checks if key exists and is valid
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Deletes a specific key
   */
  delete(key) {
    return this.cache.delete(key);
  }

  /**
   * Clears the entire cache (useful for dev/test)
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Cache size inspection
   */
  size() {
    return this.cache.size;
  }
}

export const cacheService = new MemoryCacheService();
