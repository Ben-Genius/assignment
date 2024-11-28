'use client';

import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex items 8 sm:px-6 lg:px-8 bg-white w-full items-center justify-between pt-6 py-6 border-b m">
    

      <div className="">
    
        <div className="relative flex items-center space-x-2 px-4">
        <h2 className='font-medium text-xl'>Sales Admin</h2>
          <ChevronDownIcon className="h-3 w-3 text-gray-600" />
        </div>
      </div>

      <div className="">
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
    
      </div>
    </header>
  );
}

