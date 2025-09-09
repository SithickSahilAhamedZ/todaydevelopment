import React from 'react';
import { Menu, Search, Bell, Mic } from 'lucide-react';

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
  onVoiceSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ setMenuOpen, onVoiceSearch }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between z-40 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-gray-600 dark:text-gray-300">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden md:block">PilgrimPath</h1>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-lg bg-orange-100/50 dark:bg-gray-700/50 p-1.5 rounded-full shadow-inner">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search temples, services, help..."
              className="w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full py-2 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Search"
            />
            <button 
              onClick={onVoiceSearch}
              className="absolute right-1.5 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors"
              aria-label="Voice Search"
            >
              <Mic size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 dark:text-gray-300 relative" aria-label="Notifications">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;