/**
 * Utility functions for localStorage operations with error handling and type safety
 */

/**
 * Safely get an item from localStorage
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns boolean indicating success
 */
export function setToLocalStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 * @param key - The localStorage key to remove
 * @returns boolean indicating success
 */
export function removeFromLocalStorage(key: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all localStorage data
 * @returns boolean indicating success
 */
export function clearLocalStorage(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - The localStorage key to check
 * @returns boolean indicating if key exists
 */
export function hasInLocalStorage(key: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    return window.localStorage.getItem(key) !== null;
  } catch (error) {
    console.warn(`Error checking localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Get all localStorage keys
 * @returns Array of all localStorage keys
 */
export function getAllLocalStorageKeys(): string[] {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.warn('Error getting localStorage keys:', error);
    return [];
  }
}

/**
 * Get the size of localStorage in bytes (approximate)
 * @returns number of bytes used by localStorage
 */
export function getLocalStorageSize(): number {
  try {
    if (typeof window === 'undefined') {
      return 0;
    }
    
    let total = 0;
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        total += window.localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.warn('Error calculating localStorage size:', error);
    return 0;
  }
}

/**
 * Export all localStorage data as an object
 * @returns Object containing all localStorage data
 */
export function exportLocalStorage(): Record<string, any> {
  try {
    if (typeof window === 'undefined') {
      return {};
    }
    
    const data: Record<string, any> = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        try {
          data[key] = JSON.parse(window.localStorage.getItem(key) || '');
        } catch {
          // If JSON parsing fails, store as string
          data[key] = window.localStorage.getItem(key);
        }
      }
    }
    return data;
  } catch (error) {
    console.warn('Error exporting localStorage:', error);
    return {};
  }
}

/**
 * Import data into localStorage
 * @param data - Object containing key-value pairs to import
 * @param overwrite - Whether to overwrite existing keys (default: false)
 * @returns boolean indicating success
 */
export function importToLocalStorage(
  data: Record<string, any>, 
  overwrite: boolean = false
): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    for (const [key, value] of Object.entries(data)) {
      if (!overwrite && hasInLocalStorage(key)) {
        continue;
      }
      setToLocalStorage(key, value);
    }
    return true;
  } catch (error) {
    console.warn('Error importing to localStorage:', error);
    return false;
  }
}
