import React from 'react';

const ProfileSidebar = ({ sections, activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
  const getIconSvg = (iconName) => {
    switch (iconName) {
      case 'user':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'users':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'fileText':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        );
      case 'heart':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case 'shield':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72  bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-850  p-6 transform transition-transform duration-300 md:static md:transform-none md:w-1/3 lg:w-1/4 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 animate-slide-in`}
    >
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h3>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:scale-98 ${
              activeSection === section.id
                ? 'bg-white/30 dark:bg-gray-700/30 backdrop-blur-md border border-pink-500 text-pink-500 dark:text-pink-400 shadow-md'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {getIconSvg(section.icon)}
            <span>{section.label}</span>
            {section.count !== undefined && section.count > 0 && (
              <span
                className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                  activeSection === section.id
                    ? 'bg-white text-pink-500'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                }`}
              >
                {section.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;