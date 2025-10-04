import React from 'react';
import { Outlet } from 'react-router-dom';


interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={`flex min-h-screen transition-colors ${
      'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Sidebar */}
      
      
      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className={`rounded-lg shadow-lg p-6 transition-colors ${
         'bg-white/80 backdrop-blur border border-gray-200 text-gray-900'
        }`}>
          {children ? children : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
