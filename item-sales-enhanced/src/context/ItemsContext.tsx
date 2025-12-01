import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useLocalStorageArray, useLocalStorageBoolean, useLocalStorage } from '../hooks/uselocalstorage';

export interface Item {
  id: string;
  name: string;
  reportingCategory?: string;
  stock: string | number;
  price: string;
  image?: string;
  description?: string;
  itemType?: string;
  category?: string;
  locations?: string;
  unit?: string;
  sku?: string;
  gtin?: string;
  weight?: string;
  skipItemDetails?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ItemsContextType {
  // Items management
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  deleteMultipleItems: (ids: string[]) => void;
  clearAllItems: () => void;
  
  // State management
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Filtering and search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: Item[];
  
  // Selection management
  selectedItems: string[];
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  isItemSelected: (id: string) => boolean;
  
  // Bulk operations
  bulkUpdateItems: (ids: string[], updates: Partial<Item>) => void;
  
  // Utility functions
  getItemById: (id: string) => Item | undefined;
  getItemsByCategory: (category: string) => Item[];
  getTotalItems: () => number;
  exportItems: () => Item[];
  importItems: (items: Item[], overwrite?: boolean) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const defaultItems: Item[] = [
  {
    id: '1',
    name: 'Consulting',
    reportingCategory: '',
    stock: '-',
    price: '$100.00/ea',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface ItemsProviderProps {
  children: ReactNode;
}

export function ItemsProvider({ children }: ItemsProviderProps) {
  // Persistent state using localStorage hooks
  const {
    value: items,
    setValue: setItems,
    push: pushItem,
    remove: removeItem,
    clear: clearItems,
    removeByValue: removeItemByValue
  } = useLocalStorageArray<Item>('items', defaultItems);
  
  const [loading, setLoading] = useLocalStorageBoolean('items-loading', false);
  const [error, setError] = useLocalStorage<string | null>('items-error', null);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('items-search', '');
  const {
    value: selectedItems,
    setValue: setSelectedItems,
    push: addSelectedItem,
    removeByValue: removeSelectedItem,
    clear: clearSelectedItems
  } = useLocalStorageArray<string>('items-selected', []);

  // Filtered items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.category?.toLowerCase().includes(term) ||
      item.reportingCategory?.toLowerCase().includes(term) ||
      item.sku?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  // Item management functions
  const addItem = useCallback((newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const item: Item = {
      ...newItem,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    
    pushItem(item);
  }, [pushItem]);

  const updateItem = useCallback((id: string, updatedItem: Partial<Item>) => {
    const updatedItems = items.map(item =>
      item.id === id 
        ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() } 
        : item
    );
    setItems(updatedItems);
  }, [items, setItems]);

  const deleteItem = useCallback((id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    // Also remove from selected items if it was selected
    removeSelectedItem(id);
  }, [items, setItems, removeSelectedItem]);

  const deleteMultipleItems = useCallback((ids: string[]) => {
    const updatedItems = items.filter(item => !ids.includes(item.id));
    setItems(updatedItems);
    // Remove all deleted items from selection
    const updatedSelection = selectedItems.filter(id => !ids.includes(id));
    setSelectedItems(updatedSelection);
  }, [items, setItems, selectedItems, setSelectedItems]);

  const clearAllItems = useCallback(() => {
    clearItems();
    clearSelectedItems();
  }, [clearItems, clearSelectedItems]);

  // Selection management functions
  const selectItem = useCallback((id: string) => {
    if (!selectedItems.includes(id)) {
      addSelectedItem(id);
    }
  }, [selectedItems, addSelectedItem]);

  const deselectItem = useCallback((id: string) => {
    removeSelectedItem(id);
  }, [removeSelectedItem]);

  const toggleItemSelection = useCallback((id: string) => {
    if (selectedItems.includes(id)) {
      removeSelectedItem(id);
    } else {
      addSelectedItem(id);
    }
  }, [selectedItems, removeSelectedItem, addSelectedItem]);

  const selectAllItems = useCallback(() => {
    const allIds = filteredItems.map(item => item.id);
    setSelectedItems(allIds);
  }, [filteredItems, setSelectedItems]);

  const deselectAllItems = useCallback(() => {
    clearSelectedItems();
  }, [clearSelectedItems]);

  const isItemSelected = useCallback((id: string) => {
    return selectedItems.includes(id);
  }, [selectedItems]);

  // Bulk operations
  const bulkUpdateItems = useCallback((ids: string[], updates: Partial<Item>) => {
    const now = new Date().toISOString();
    const updatedItems = items.map(item =>
      ids.includes(item.id) 
        ? { ...item, ...updates, updatedAt: now }
        : item
    );
    setItems(updatedItems);
  }, [items, setItems]);

  // Utility functions
  const getItemById = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  const getItemsByCategory = useCallback((category: string) => {
    return items.filter(item => item.category === category);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.length;
  }, [items]);

  const exportItems = useCallback(() => {
    return [...items]; // Return a copy
  }, [items]);

  const importItems = useCallback((newItems: Item[], overwrite: boolean = false) => {
    if (overwrite) {
      setItems(newItems);
      clearSelectedItems();
    } else {
      // Merge items, avoiding duplicates by ID
      const existingIds = new Set(items.map(item => item.id));
      const itemsToAdd = newItems.filter(item => !existingIds.has(item.id));
      setItems([...items, ...itemsToAdd]);
    }
  }, [items, setItems, clearSelectedItems]);

  const contextValue: ItemsContextType = {
    // Items management
    items,
    addItem,
    updateItem,
    deleteItem,
    deleteMultipleItems,
    clearAllItems,
    
    // State management
    loading,
    setLoading,
    error,
    setError,
    
    // Filtering and search
    searchTerm,
    setSearchTerm,
    filteredItems,
    
    // Selection management
    selectedItems,
    selectItem,
    deselectItem,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    isItemSelected,
    
    // Bulk operations
    bulkUpdateItems,
    
    // Utility functions
    getItemById,
    getItemsByCategory,
    getTotalItems,
    exportItems,
    importItems,
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
