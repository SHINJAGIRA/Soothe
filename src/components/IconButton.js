import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const IconButton = ({ icon = faGoogle, tooltip, onClick, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
        aria-label={tooltip || label}
      >
        <FontAwesomeIcon icon={icon} className="w-5 h-5 mr-2" />
      </button>

      {tooltip && (
        <div
          className={`absolute z-10 px-3 py-2 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg transition-opacity duration-200 pointer-events-none
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
        >
          {tooltip}
          <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

export default IconButton;