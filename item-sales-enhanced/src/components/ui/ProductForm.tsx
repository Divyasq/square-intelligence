import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { TextArea } from './TextArea';
import { Toggle } from './Toggle';
import { Card } from './Card';
import { PromotionalCard } from './PromotionalCard';
import { Label } from './Label';
import { Separator } from './Separator';
import { FormSection } from './FormSection';
import { InlineInputAction } from './InlineInputAction';
import { ImageUpload } from './ImageUpload';
import { 
  Package, 
  Upload, 
  X, 
  Sparkles, 
  QrCode, 
  ChevronDown, 
  Menu, 
  FolderOpen, 
  Plus,
  Info
} from 'lucide-react';

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

interface ProductFormProps {
  onSubmit?: (data: ProductFormData) => void;
  onCancel?: () => void;
  onSaveAsDraft?: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
  className?: string;
}

export function ProductForm({ onSubmit, onCancel, onSaveAsDraft, initialData, className }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    itemType: initialData?.itemType || 'Physical good',
    category: initialData?.category || '',
    locations: initialData?.locations || 'Tech for Product',
    unit: initialData?.unit || 'Per item',
    price: initialData?.price || '',
    sku: initialData?.sku || '',
    gtin: initialData?.gtin || '',
    weight: initialData?.weight || '',
    skipItemDetails: initialData?.skipItemDetails || false,
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const itemTypes = [
    { value: 'Physical good', label: 'Physical good' },
    { value: 'Digital good', label: 'Digital good' },
    { value: 'Service', label: 'Service' },
  ];

  const categories = [
    { value: '', label: 'Select category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'home', label: 'Home & Garden' },
  ];

  const units = [
    { value: 'Per item', label: 'Per item' },
    { value: 'Per pound', label: 'Per pound' },
    { value: 'Per kilogram', label: 'Per kilogram' },
    { value: 'Per liter', label: 'Per liter' },
  ];

  const locations = [
    { value: 'Tech for Product', label: 'Tech for Product' },
    { value: 'Main Store', label: 'Main Store' },
    { value: 'Online Only', label: 'Online Only' },
  ];

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ProductFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter a name for your item.';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Please enter a price.';
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = 'Please enter a valid price.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleImageUpload = (files: File[]) => {
    console.log('Images uploaded:', files);
  };

  return (
    <div className={`max-w-5xl mx-auto bg-white ${className}`}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Item</h1>
          <p className="text-gray-600">Add a new item to your inventory with detailed information and pricing.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Details Section */}
          <FormSection title="Details">
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="col-span-2 space-y-4">
                {/* Item Type */}
                <div>
                  <Label>Item type</Label>
                  <div className="mt-1 flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white">
                    <span className="text-gray-900">{formData.itemType}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => console.log('Change item type')}
                      className="text-blue-600 border-0 hover:bg-gray-50"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label>Name</Label>
                  <div className="mt-1 relative">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      placeholder=""
                      className="pr-32"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => console.log('Auto create')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 border-0 hover:bg-gray-50 flex items-center gap-1"
                    >
                      <QrCode className="w-4 h-4" />
                      Auto create
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <TextArea
                  label="Item Type"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder=""
                  className="min-h-[120px]"
                />
              </div>
              {/* Right Column - Image Upload */}
              <div className="col-span-1">
                <div className="w-full">
                  <div className="w-full h-32 bg-gray-400 rounded-t-md"></div>
                  <button 
                    type="button"
                    className="w-full py-2 bg-white border border-gray-300 rounded-b-md text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>


            {/* Drag & Drop Area - Full Width */}
            <div className="mt-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <div className="flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-gray-400 mr-3" />
                  <p className="text-sm text-gray-600">
                    Drag and drop images here, <span className="text-blue-600 underline cursor-pointer">upload</span>, or <span className="text-blue-600 underline cursor-pointer">browse image library</span>.
                  </p>
                </div>
              </div>
            </div>

            <PromotionalCard
              title="Take your item photos to the next level."
              description="Scan to download the Photo Studio app for free. Learn more"
              onDismiss={() => console.log('Dismissed')}
              className="mt-6"
            />

            <div className="mt-6">
              <Select
                label="Locations"
                options={locations}
                value={formData.locations}
                onChange={(e) => handleInputChange('locations', e.target.value)}
              />
            </div>
          </FormSection>

          <Separator />

          {/* Categorization Section */}
          <FormSection 
            title="Categorization"
            description="Group items to organize the menu on your POS and Square Online sites. Categorize items for Square POS, coursing, sales reporting, and kitchen routing."
          >
            <div className="space-y-4">
              <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Menu className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Menu organization</p>
                      <p className="text-sm text-gray-500">Organize items in your menu structure</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Select</Button>
                </div>
              </Card>

              <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Categories</p>
                      <p className="text-sm text-gray-500">Assign to product categories</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Select</Button>
                </div>
              </Card>
            </div>
          </FormSection>

          <Separator />

          {/* Options Section */}
          <FormSection 
            title="Options"
            description="Add options such as size, color, or material to create variations in bulk."
          >
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="text-blue-600">Learn more</Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
          </FormSection>

          <Separator />

          {/* Units Section */}
          <FormSection 
            title="Units"
            description="Add additional units to track and measure this item. For example, sell a case of wine by both a glass and bottle."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Unit"
                options={units}
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
              />
              <Input
                label="Unit Cost and Vendor"
                disabled
                placeholder="Add cost tracking"
                trailingAction={
                  <Info className="w-4 h-4 text-gray-400" />
                }
              />
            </div>
          </FormSection>

          <Separator />

          {/* Variations Section */}
          <FormSection title="Variations">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" className="text-blue-600">Edit variation details</Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Variation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Input
                label="GTIN"
                value={formData.gtin}
                onChange={(e) => handleInputChange('gtin', e.target.value)}
                placeholder="Global Trade Item Number"
              />
              
              <Input
                label="SKU"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Stock Keeping Unit"
              />
              
              <Input
                label="Weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="0.00"
                step="0.01"
                unit="kg"
              />
              
              <Input
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                error={errors.price}
                placeholder="0.00"
                step="0.01"
                unit="$"
              />
            </div>
          </FormSection>

          <Separator />

          {/* Checkout Behavior */}
          <FormSection title="Checkout Behavior">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Skip item details screen</h4>
                  <p className="text-sm text-gray-600">
                    When this item is added to the cart, the first item variation along with any pre-selected modifiers will be applied. You will not be shown the item detail screen.
                  </p>
                </div>
                <Toggle
                  checked={formData.skipItemDetails}
                  onCheckedChange={(checked) => handleInputChange('skipItemDetails', checked)}
                  className="ml-4"
                />
              </div>
            </Card>
          </FormSection>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <Button type="submit" size="lg" className="px-8">
              Save Item
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              size="lg" 
              className="px-8"
              onClick={() => onSaveAsDraft?.(formData)}
            >
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}