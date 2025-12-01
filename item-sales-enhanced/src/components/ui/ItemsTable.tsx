import React, { useState } from 'react';
import { MoreHorizontal, Plus, Settings, Package } from 'lucide-react';
import { Alert } from './Alert';
import { Button } from './Button';
import { TableToolbar } from './TableToolbar';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from './Table';
import { Checkbox } from './Checkbox';
import { DropdownMenu } from './DropdownMenu';
import { cn } from '../../utils/cn';

interface Item {
  id: string;
  name: string;
  reportingCategory?: string;
  stock: string | number;
  price: string;
  image?: string;
}

interface ItemsTableProps {
  items?: Item[];
  onCreateItem?: () => void;
  onImportLibrary?: () => void;
  onEditItem?: (item: Item) => void;
  onDeleteItem?: (itemId: string) => void;
}

export function ItemsTable({ 
  items = [], 
  onCreateItem, 
  onImportLibrary,
  onEditItem,
  onDeleteItem
}: ItemsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(true);

  const defaultItems: Item[] = [
    {
      id: '1',
      name: 'Consulting',
      reportingCategory: '',
      stock: '-',
      price: '$100.00/ea'
    }
  ];

  const displayItems = (items && items.length > 0) ? items : defaultItems;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(displayItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="p-8">
        {showAlert && (
          <Alert
            variant="info"
            dismissable
            onDismiss={() => setShowAlert(false)}
            action={
              <button
                onClick={onImportLibrary}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Import library
              </button>
            }
          >
            <b className="font-semibold">Already have items?</b> Upload an existing item catalog to get started.
          </Alert>
        )}

        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateClick={onCreateItem}
          createButtonLabel="Create item"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedItems.length === displayItems.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  Item
                </div>
              </TableHeaderCell>
              <TableHeaderCell className="w-8"></TableHeaderCell>
              <TableHeaderCell>Reporting category</TableHeaderCell>
              <TableHeaderCell align="right">Stock</TableHeaderCell>
              <TableHeaderCell align="right">Price</TableHeaderCell>
              <TableHeaderCell align="center" className="w-12">
                <Settings className="h-4 w-4 mx-auto text-gray-400" />
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {/* Quick create row */}
            <TableRow className="bg-blue-50 hover:bg-blue-100 cursor-pointer">
              <TableCell colSpan={6}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                    <Plus className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-semibold text-blue-600">Quick create</span>
                </div>
              </TableCell>
            </TableRow>

            {/* Items */}
            {displayItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    />
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <span className="text-blue-600 font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-gray-600">{item.reportingCategory || '-'}</TableCell>
                <TableCell align="right">
                  {item.stock === '-' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                      -
                    </span>
                  ) : (
                    <span>{item.stock}</span>
                  )}
                </TableCell>
                <TableCell align="right" className="font-medium">{item.price}</TableCell>
                <TableCell align="center">
                  <DropdownMenu
                    trigger={
                      <div className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </div>
                    }
                    onEdit={() => onEditItem?.(item)}
                    onDelete={() => onDeleteItem?.(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}