import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="back-btn" onClick={onClose}>← Items & services</button>
      </div>
      
      <div className="sidebar-content">
        <div className="search-section">
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="sidebar-section">
          <h3>Items</h3>
          <ul className="sidebar-menu">
            <li className="active">Item library</li>
            <li>Channel listings</li>
            <li>Service library</li>
            <li>Image library</li>
            <li>Modifiers</li>
            <li>Categories</li>
            <li>Discounts</li>
            <li>Options</li>
            <li>Units</li>
            <li>Custom attributes</li>
            <li>Settings</li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Inventory management</h3>
        </div>

        <div className="sidebar-section">
          <h3>Gift Cards</h3>
        </div>

        <div className="sidebar-section">
          <h3>Subscription plans</h3>
        </div>

        <div className="sidebar-footer">
          <button className="take-payment-btn">💳 Take payment</button>
        </div>
      </div>
    </div>
  );
};
