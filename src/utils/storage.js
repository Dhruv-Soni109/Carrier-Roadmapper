const STORAGE_PREFIX = 'pathforge_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage:`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to localStorage:`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.warn(`Error removing ${key} from localStorage:`, e);
    }
  },

  clearAll: () => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  }
};
