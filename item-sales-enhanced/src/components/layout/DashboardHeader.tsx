import React from 'react';
import { Bell, MessageCircle, HelpCircle, User } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Square</h1>
            </div>
          </div>
          
          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium pb-4">
                Transactions
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium pb-4">
                Customers
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium pb-4">
                Reports
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium pb-4">
                More
              </a>
            </nav>
          </div>
          
          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {/* Notification icons */}
            <div className="flex items-center space-x-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* User profile */}
            <div className="flex items-center space-x-3 ml-4">
              <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900 hidden sm:block">Tech for Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
