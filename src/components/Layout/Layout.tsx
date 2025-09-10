import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden gap-0">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full ml-0">
            <Breadcrumbs />
            <div className="mt-4 sm:mt-6">
              <Outlet />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;