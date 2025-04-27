import React, { useState } from 'react';

const ProfileHeader = ({ user, updateUser }) => {
  const [previewUrl, setPreviewUrl] = useState(user.profilePicture);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
      updateUser({ profilePicture: newUrl });
    }
  };

  return (
    <div className="w-full animate-slide-down">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400 via-pink-500 to-pink-600 p-1 shadow-lg">
            <img src={previewUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <label
            htmlFor="profilePicture"
            className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-400 rounded-full p-2 cursor-pointer shadow-md hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 15 7 19 7" />
              <line x1="10" x2="15" y1="14" y2="9" />
            </svg>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-pink-500 dark:text-pink-400">
            {user.displayName || user.email.split('@')[0]}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          {user.location && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{user.location}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;