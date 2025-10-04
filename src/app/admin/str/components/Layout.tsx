'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main content area */}
      <main className="ml-80 pt-20 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          <div className="rounded-xl shadow-lg p-8 bg-white/80 backdrop-blur border border-gray-200 text-gray-900">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
