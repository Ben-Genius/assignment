"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../ui/sidebar/sidebar';
import Navbar from '../ui/navbar/navbar';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../services/utils/auth';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticated = checkAuth();
    if (!authenticated) {
      router.replace('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setSidebarOpen(false)} // Close sidebar on overlay click
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isMobileOpen={sidebarOpen}  onLinkClick={() => setSidebarOpen(false)} />


      {/* Main content area */}
      <div className="lg:pl-[15rem] pr-2">
        <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
