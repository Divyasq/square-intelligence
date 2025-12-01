import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../ui/Table';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

export function TableDemo() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const sampleData = [
    { id: '1', name: 'MacBook Pro', category: 'Electronics', price: '$2,499.00', status: 'In Stock', quantity: 12 },
    { id: '2', name: 'Office Chair', category: 'Furniture', price: '$299.99', status: 'Low Stock', quantity: 3 },
    { id: '3', name: 'Wireless Mouse', category: 'Electronics', price: '$49.99', status: 'In Stock', quantity: 25 },
    { id: '4', name: 'Desk Lamp', category: 'Furniture', price: '$79.99', status: 'Out of Stock', quantity: 0 },
    { id: '5', name: 'Notebook', category: 'Stationery', price: '$12.99', status: 'In Stock', quantity: 50 }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(sampleData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Table Components</h2>
        <p className="text-gray-600 mb-6">
          Flexible table components with support for selection, actions, and different content types.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Data Table</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.length === sampleData.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    Product
                  </div>
                </TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell align="right">Price</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell align="right">Quantity</TableHeaderCell>
                <TableHeaderCell align="center">Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{item.category}</TableCell>
                  <TableCell align="right" className="font-medium">{item.price}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Simple Table</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell align="right">Joined</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Administrator</TableCell>
                <TableCell align="right">2 days ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">1 week ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell align="right">3 weeks ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">With Merged Cells</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Section</TableHeaderCell>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell align="right">Value</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="font-medium bg-gray-50">
                  Performance Metrics
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Total Sales</TableCell>
                <TableCell align="right">$12,345</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Orders</TableCell>
                <TableCell align="right">234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="font-medium bg-gray-50">
                  Inventory Status
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Items in Stock</TableCell>
                <TableCell align="right">1,234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Low Stock Items</TableCell>
                <TableCell align="right">23</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {selectedRows.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              {selectedRows.length} item(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}