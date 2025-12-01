import React, { useState } from 'react';
import { ItemsTable } from '../components/ui/ItemsTable';
import { Modal } from '../components/ui/Modal';
import { ProductForm } from '../components/ui/ProductForm';
import { useItems } from '../context/ItemsContext';
import { ItemsNavigation } from '../components/items/ItemsNavigation';
import { CategoriesView } from '../components/items/CategoriesView';
import { ItemLibraryView } from '../components/items/ItemLibraryView';

interface ProductFormData {
  name: string;
  description: string;
  itemType: string;
  category: string;
  locations: string;
  unit: string;
  price: string;
  sku: string;
  gtin: string;
  weight: string;
  skipItemDetails: boolean;
}

interface Item {
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
}

export function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [currentView, setCurrentView] = useState<string>('items');
  const { items, addItem, updateItem, deleteItem } = useItems();

  const handleCreateItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId);
    }
  };

  const handleImportLibrary = () => {
    console.log('Import library clicked');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = (formData: ProductFormData) => {
    if (editingItem) {
      // Update existing item
      const updatedItem = {
        id: editingItem.id,
        name: formData.name,
        description: formData.description,
        reportingCategory: formData.category,
        stock: editingItem.stock, // Keep existing stock
        price: formData.price ? `$${formData.price}` : '$0.00',
        itemType: formData.itemType,
        category: formData.category,
        locations: formData.locations,
        unit: formData.unit,
        sku: formData.sku,
        gtin: formData.gtin,
        weight: formData.weight,
        skipItemDetails: formData.skipItemDetails,
      };

      updateItem(editingItem.id, updatedItem);
      console.log('Item updated:', updatedItem);
    } else {
      // Create new item
      const newItem = {
        name: formData.name,
        description: formData.description,
        reportingCategory: formData.category,
        stock: 0,
        price: formData.price ? `$${formData.price}` : '$0.00',
        itemType: formData.itemType,
        category: formData.category,
        locations: formData.locations,
        unit: formData.unit,
        sku: formData.sku,
        gtin: formData.gtin,
        weight: formData.weight,
        skipItemDetails: formData.skipItemDetails,
      };

      addItem(newItem);
      console.log('Item added:', newItem);
    }
    
    // Close modal
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Convert item data to form data format
  const getInitialFormData = (item: Item): Partial<ProductFormData> => {
    return {
      name: item.name,
      description: item.description || '',
      itemType: item.itemType || 'Physical good',
      category: item.category || '',
      locations: item.locations || 'Tech for Product',
      unit: item.unit || 'Per item',
      price: item.price ? item.price.replace(/[$\/ea]/g, '') : '',
      sku: item.sku || '',
      gtin: item.gtin || '',
      weight: item.weight || '',
      skipItemDetails: item.skipItemDetails || false,
    };
  };

  return (
    <div className="flex h-full">
      <ItemsNavigation currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1">
        {currentView === 'items' && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Items
              </h2>
              <p className="text-gray-600">
                Manage your inventory items and services
              </p>
            </div>
            
            <ItemsTable 
              items={items}
              onCreateItem={handleCreateItem}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onImportLibrary={handleImportLibrary}
            />
          </div>
        )}

        {currentView === 'item-library' && <ItemLibraryView />}
        {currentView === 'categories' && <CategoriesView />}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingItem ? "Edit item" : "Create item"}
        >
          <ProductForm 
            initialData={editingItem ? getInitialFormData(editingItem) : undefined}
            onSubmit={handleFormSubmit} 
            onCancel={handleCloseModal}
            onSaveAsDraft={(data) => {
              console.log('Save as draft:', data);
              // Could implement draft functionality here
            }}
          />
        </Modal>
      </div>
    </div>
  );
}
