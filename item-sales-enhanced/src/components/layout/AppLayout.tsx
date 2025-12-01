import React from 'react';
import { Outlet } from 'react-router-dom';
import { LeftNav } from './LeftNav';
import { FloatingChat } from '../chat/FloatingChat';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftNav />
      <main className="flex-1 relative">
        <Outlet />
        <FloatingChat />
      </main>
    </div>
  );
}
