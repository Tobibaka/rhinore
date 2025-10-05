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
    {/* Main content area */}
      <main>
        <div>
          {children ? children : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
