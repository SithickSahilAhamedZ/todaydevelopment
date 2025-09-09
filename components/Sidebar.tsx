import React from 'react';
import { Home, Map, CalendarCheck, Siren, FileWarning, Image, X, Bot } from 'lucide-react';
import { Page } from '../types';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page, context?: any) => void;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NavLink: React.FC<{
  item: { page: Page; icon: React.ElementType; label: string };
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors duration-200 ${
      isActive
        ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 font-semibold'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
    <span>{item.label}</span>
  </button>
);

const SidebarContent: React.FC<{activePage: Page, setActivePage: (page: Page) => void, onLinkClick: () => void}> = ({ activePage, setActivePage, onLinkClick }) => {
  const { t } = useI18n();

  const mainNavItems = [
    { page: Page.Home, icon: Home, label: t('home') },
    { page: Page.Navigation, icon: Map, label: t('navigation') },
    { page: Page.Booking, icon: CalendarCheck, label: t('booking') },
    { page: Page.Emergency, icon: Siren, label: t('emergency') },
    { page: Page.Report, icon: FileWarning, label: t('report') },
  ];

  const secondaryNavItems = [
    { page: Page.Gallery, icon: Image, label: t('gallery') },
  ];
  
  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onLinkClick();
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col p-4">
      <div className="flex items-center justify-between mb-6 h-12">
          <div className="flex items-center space-x-2">
            <Bot size={32} className="text-orange-500"/>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">PilgrimPath</h1>
          </div>
      </div>
      <nav className="flex-grow space-y-2">
          {mainNavItems.map((item) => (
              <NavLink key={item.page} item={item} isActive={activePage === item.page} onClick={() => handleNavigation(item.page)} />
          ))}
          <hr className="my-4 border-gray-200 dark:border-gray-700"/>
          {secondaryNavItems.map((item) => (
              <NavLink key={item.page} item={item} isActive={activePage === item.page} onClick={() => handleNavigation(item.page)} />
          ))}
      </nav>
      <div className="mt-auto">
        <LanguageSwitcher />
      </div>
    </div>
  );
}


const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isMenuOpen, setMenuOpen }) => {
  const onLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)}></div>
        <div className={`relative w-72 h-full bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <SidebarContent activePage={activePage} setActivePage={setActivePage} onLinkClick={onLinkClick} />
            <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Close menu">
                <X size={24} />
            </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="w-64 h-screen hidden md:block flex-shrink-0">
          <SidebarContent activePage={activePage} setActivePage={setActivePage} onLinkClick={() => {}} />
      </div>
    </>
  );
};

export default Sidebar;