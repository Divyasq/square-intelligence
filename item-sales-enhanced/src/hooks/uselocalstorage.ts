import { useState, useEffect, useCallback, useRef } from 'react';
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from '../utils/localstorage';

/**
 * Custom hook for managing localStorage with React state synchronization
 * @param key - The localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue, removeValue] tuple
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromLocalStorage(key, initialValue);
  });

  // Keep track of the key to handle key changes
  const keyRef = useRef(key);

  // Update stored value when key changes
  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;
      setStoredValue(getFromLocalStorage(key, initialValue));
    }
  }, [key, initialValue]);

  // Set value function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function for functional updates
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to localStorage
        setToLocalStorage(key, valueToStore);
        
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(
          new CustomEvent('localStorage-change', {
            detail: { key, value: valueToStore }
          })
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value function
  const removeValue = useCallback(() => {
    try {
      // Remove from state
      setStoredValue(initialValue);
      
      // Remove from localStorage
      removeFromLocalStorage(key);
      
      // Dispatch custom event for cross-tab synchronization
      window.dispatchEvent(
        new CustomEvent('localStorage-change', {
          detail: { key, value: undefined }
        })
      );
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          // If parsing fails, use the raw string value
          setStoredValue(e.newValue as unknown as T);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        if (e.detail.value !== undefined) {
          setStoredValue(e.detail.value);
        } else {
          setStoredValue(initialValue);
        }
      }
    };

    // Listen for native storage events (cross-tab)
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom events (same-tab)
    window.addEventListener('localStorage-change', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage-change', handleCustomStorageChange as EventListener);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing boolean values in localStorage
 * @param key - The localStorage key
 * @param initialValue - Initial boolean value (default: false)
 * @returns [value, setValue, toggle, removeValue] tuple
 */
export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean = false
): [boolean, (value: boolean) => void, () => void, () => void] {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, [setValue]);

  const setBooleanValue = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, [setValue]);

  return [value, setBooleanValue, toggle, removeValue];
}

/**
 * Hook for managing arrays in localStorage
 * @param key - The localStorage key
 * @param initialValue - Initial array value (default: [])
 * @returns Object with array operations
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
): {
  value: T[];
  setValue: (value: T[]) => void;
  push: (item: T) => void;
  remove: (index: number) => void;
  removeByValue: (item: T) => void;
  clear: () => void;
  removeValue: () => void;
} {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const push = useCallback((item: T) => {
    setValue(prev => [...prev, item]);
  }, [setValue]);

  const remove = useCallback((index: number) => {
    setValue(prev => prev.filter((_, i) => i !== index));
  }, [setValue]);

  const removeByValue = useCallback((item: T) => {
    setValue(prev => prev.filter(i => i !== item));
  }, [setValue]);

  const clear = useCallback(() => {
    setValue([]);
  }, [setValue]);

  return {
    value,
    setValue,
    push,
    remove,
    removeByValue,
    clear,
    removeValue
  };
}

/**
 * Hook for managing objects in localStorage with partial updates
 * @param key - The localStorage key
 * @param initialValue - Initial object value
 * @returns Object with update operations
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
): {
  value: T;
  setValue: (value: T) => void;
  updateValue: (updates: Partial<T>) => void;
  resetValue: () => void;
  removeValue: () => void;
} {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const updateValue = useCallback((updates: Partial<T>) => {
    setValue(prev => ({ ...prev, ...updates }));
  }, [setValue]);

  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  return {
    value,
    setValue,
    updateValue,
    resetValue,
    removeValue
  };
}

/**
 * Hook for managing localStorage with expiration
 * @param key - The localStorage key
 * @param initialValue - Initial value
 * @param ttl - Time to live in milliseconds
 * @returns [value, setValue, removeValue, isExpired] tuple
 */
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  ttl: number
): [T, (value: T) => void, () => void, boolean] {
  const expiryKey = `${key}_expiry`;
  
  const [value, setValue] = useLocalStorage(key, initialValue);
  const [expiry, setExpiry] = useLocalStorage(expiryKey, 0);

  const isExpired = Date.now() > expiry;

  const setValueWithExpiry = useCallback((newValue: T) => {
    setValue(newValue);
    setExpiry(Date.now() + ttl);
  }, [setValue, setExpiry, ttl]);

  const removeValue = useCallback(() => {
    removeFromLocalStorage(key);
    removeFromLocalStorage(expiryKey);
    setValue(initialValue);
    setExpiry(0);
  }, [key, expiryKey, setValue, setExpiry, initialValue]);

  // Auto-remove expired values
  useEffect(() => {
    if (isExpired && expiry > 0) {
      removeValue();
    }
  }, [isExpired, expiry, removeValue]);

  return [isExpired ? initialValue : value, setValueWithExpiry, removeValue, isExpired];
}
