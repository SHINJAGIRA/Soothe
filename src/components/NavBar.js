'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faComments,
  faBell,
  faPlus,
  faUser,
  faCog,
  faSignOutAlt,
  faSearch,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';

const NavItem = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-pink-500/20 group cursor-pointer
      ${isActive ? 'bg-pink-500/30 text-pink-300' : ''}`}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={icon} className="w-6 h-6 mr-4 md:mr-0 lg:mr-4" />
    <span className="hidden lg:inline font-medium">{label}</span>
  </li>
);

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { icon: faHome, label: 'Home' },
    { icon: faUsers, label: 'Communities' },
    { icon: faComments, label: 'Chat' },
    { icon: faBell, label: 'Notifications' },
    { icon: faPlus, label: 'Create' },
    { icon: faUser, label: 'Profile' },
  ];

  const settingsItems = [
    { icon: faCog, label: 'Settings' },
    { icon: faSignOutAlt, label: 'Logout' },
  ];

  const handleNavClick = (label) => {
    setActiveItem(label);
  };

  return (
    <>
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center z-20 border-b border-pink-300/20 shadow-sm">
        <div className="text-2xl font-bold text-pink-500 tracking-tight">Soothe</div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>

      <nav className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-gray-100 dark:bg-gray-800 border-r border-pink-300/20 flex-col p-6 z-10 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="text-3xl font-bold text-pink-500 tracking-tight">Soothe</div>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </div>
        <div className="mb-6">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
        </div>
        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleNavClick(item.label)}
            />
          ))}
        </ul>
        <ul className="space-y-2">
          {settingsItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleNavClick(item.label)}
            />
          ))}
        </ul>
      </nav>

      {/* Medium Screens */}

      <nav className="hidden sm:flex lg:hidden fixed top-0 left-0 h-screen w-20 bg-gray-100 dark:bg-gray-800 border-r border-pink-300/20 flex-col items-center p-3 z-10 shadow-lg">
        <div className="text-xl font-bold text-pink-500 mb-10">S</div>
        <ul className="space-y-4 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleNavClick(item.label)}
            />
          ))}
        </ul>
        <ul className="space-y-2">
          {settingsItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleNavClick(item.label)}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom appbar */}
      <nav className="lg:hidden sm:hidden md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t border-pink-300/20 p-3 z-20 shadow-lg">
        <ul className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <li
              key={item.label}
              className={`p-3 rounded-lg transition-all duration-200 hover:bg-pink-500/20 cursor-pointer
                ${activeItem === item.label ? 'bg-pink-500/30 text-pink-300' : ''}`}
              onClick={() => handleNavClick(item.label)}
            >
              <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;