import React from 'react';
import { Item } from '../context/ItemsContext';

interface ItemRowProps {
  item: Item;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, isSelected, onSelect }) => {
  return (
    <tr className={`item-row ${isSelected ? 'selected' : ''}`}>
      <td className="checkbox-cell">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.id)}
        />
      </td>
      <td className="item-cell">
        <div className="item-info">
          <div className="item-icon">
            📦
          </div>
          <span className="item-name">{item.name}</span>
        </div>
      </td>
      <td className="category-cell">{item.reportingCategory}</td>
      <td className="locations-cell">{item.locations}</td>
      <td className="stock-cell">{item.stock}</td>
      <td className="available-cell">{item.stock}</td>
      <td className="price-cell">{item.price}</td>
      <td className="actions-cell">
        <button className="actions-btn">⋯</button>
      </td>
    </tr>
  );
};
