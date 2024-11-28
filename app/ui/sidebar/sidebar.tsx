'use client';

import { Cog6ToothIcon, ChartBarIcon, UsersIcon, ShoppingBagIcon, EnvelopeIcon, WalletIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { BsGridFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { IoLockClosed } from 'react-icons/io5';
import { BiDoorOpen } from 'react-icons/bi';
import { logoutUser } from '@/app/services/utils/auth';
const navigation = [
  { name: 'Overview', href: '/dashboard', icon: BsGridFill },
  { name: 'Statistics', href: '/dashboard/statistics', icon: ChartBarIcon, current: false },
  { name: 'Customers', href: '/dashboard/customers', icon: UsersIcon, current: false },
  { name: 'Products', href: '/dashboard/products', icon: ShoppingBagIcon, current: false },
  { name: 'Messages', href: '/dashboard/messages', icon: EnvelopeIcon, current: false },
  { name: 'Wallet', href: '/dashboard/wallet', icon: WalletIcon, current: false },
];

const generalNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: false },
  { name: 'Security', href: '/security', icon: ShieldCheckIcon, current: false },

];

export default function Sidebar({ isMobileOpen, onLinkClick }: { isMobileOpen?: boolean, onLinkClick?: () => void }) {

  const pathname = usePathname();
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };
  return (
    <div
      className={`bg-[#003B1D] ${
        isMobileOpen
          ? 'fixed inset-y-0 left-0 z-50 w-64 transform translate-x-0 lg:hidden transition-transform duration-300'
          : 'fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full transition-transform duration-300'
      } lg:fixed lg:inset-y-0 lg:z-50 lg:w-64 lg:translate-x-0 lg:flex lg:flex-col`}
    >
      {/* Header */}
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold w-full text-center">RB</h1>
        <p className="text-white font-semibold text-sm mt-2">MENU</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-5">
          {navigation.map((item) => {
              const isActive = pathname === item.href;
              return(
                <li key={item.name} className="relative">
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-[0.4rem] mx-auto bg-[#00FF00] rounded-r">
  
                  </div>
                )}
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 rounded-lg px-6 py-2 transition-colors font-semibold  ${
                    isActive
                      ? 'text-white font-bold ' 
                      : 'text-gray-400 hover:bg-[#004D26] hover:text-white'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.current ? 'text-[#00FF00]' : ''}`} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
              )
          }
           
          )}
        </ul>

        {/* General Section */}

        <div className="mt-8 py-3  border-t border-[#004D26] ">
          <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            GENERAL
          </p>
          <ul className="space-y-1">
            {generalNavigation.map((item) => 
             {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="relative">
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[0.4rem] mx-auto bg-[#00FF00] rounded-r">
                    </div>
                  )}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-6 py-2 transition-colors font-semibold  ${
                      isActive
                        ? 'text-white font-bold '
                        : 'text-gray-400 hover:bg-[#004D26] hover:text-white'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${item.current ? 'text-[#00FF00]' : ''}`} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
             }
            )}
          </ul>
        </div>
      </nav>
      <button
        type="button"
        onClick={logoutUser}
        className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center my-7 w-[90%] mx-auto ml-2 md:ml-0"
      > Logout
        <BiDoorOpen aria-hidden="true" className="-ml-0.5 size-4 text-gray-800 fill-current" />
       
      </button>

      {/* User Profile */}
      <div className="p-4 lg:mt-auto border-t border-[#004D26] mt-[10rem] md:mt-[20rem]">
        <div className="flex items-center gap-3 px-3 py-2 ">
          <div className="h-8 w-8 rounded-full bg-[#00FF00]"></div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">Fandaww Punx</h3>
            <p className="text-xs text-gray-400">carbon.xx@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}