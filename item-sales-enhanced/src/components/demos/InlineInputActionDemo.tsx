import React, { useState } from 'react';
import { InlineInputAction } from '../ui/InlineInputAction';
import { QrCode, Sparkles, Edit, Search } from 'lucide-react';

export function InlineInputActionDemo() {
  const [itemType, setItemType] = useState('Physical good');
  const [itemName, setItemName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
    if (e.target.value.length > 0) {
      setNameError('');
    }
  };

  const handleAutoCreate = () => {
    if (itemName.trim() === '') {
      setNameError('Please enter a name to auto-create');
      return;
    }
    setProductCode(`AUTO-${itemName.replace(/\s+/g, '-').toUpperCase()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Inline Input Action</h2>
        <p className="text-gray-600 mb-6">
          Input fields with trailing action buttons for common workflows.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Read-only with Change Action</h3>
          <InlineInputAction
            label="Item Type"
            value={itemType}
            actionLabel="Change"
            onActionClick={() => console.log('Change item type')}
            readOnly
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">With Icon and Error Handling</h3>
          <InlineInputAction
            label="Item Name"
            value={itemName}
            onChange={handleNameChange}
            actionLabel="Auto create"
            onActionClick={handleAutoCreate}
            actionIcon={<QrCode className="w-4 h-4 mr-2" />}
            error={nameError}
            placeholder="Enter item name"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Generated Result</h3>
          <InlineInputAction
            label="Product Code"
            value={productCode}
            actionLabel="Edit"
            onActionClick={() => console.log('Edit product code')}
            actionIcon={<Edit className="w-4 h-4 mr-2" />}
            readOnly
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Different Action Types</h3>
          <div className="space-y-4">
            <InlineInputAction
              label="Search Query"
              value=""
              actionLabel="Search"
              onActionClick={() => console.log('Search')}
              actionIcon={<Search className="w-4 h-4 mr-2" />}
              placeholder="Enter search terms"
            />
            
            <InlineInputAction
              label="Description"
              value=""
              actionLabel="Generate"
              onActionClick={() => console.log('Generate description')}
              actionIcon={<Sparkles className="w-4 h-4 mr-2" />}
              placeholder="Enter description or generate with AI"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">States</h3>
          <div className="space-y-4">
            <InlineInputAction
              label="Normal State"
              value="Sample value"
              actionLabel="Action"
              onActionClick={() => {}}
            />
            
            <InlineInputAction
              label="With Error"
              value=""
              actionLabel="Action"
              onActionClick={() => {}}
              error="This field is required"
            />
          </div>
        </div>
      </div>
    </div>
  );
}