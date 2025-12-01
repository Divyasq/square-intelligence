import React from 'react';
import { ItemsTable } from '../ui/ItemsTable';

export function ItemsTableDemo() {
  return (
    <ItemsTable
      onCreateItem={() => console.log('Create item clicked')}
      onImportLibrary={() => console.log('Import library clicked')}
    />
  );
}