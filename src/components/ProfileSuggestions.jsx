import React from 'react';

const ProfileSuggestions = ({ suggestions }) => {
  return (
    <div className=" bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 p-6 animate-slide-up">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Suggestions</h3>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Communities to Join</h4>
        <ul className="space-y-2">
          {suggestions.communities.map((community, index) => (
            <li
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex justify-between items-center group hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <span className="text-gray-800 dark:text-gray-200">{community}</span>
              <button className="px-3 py-1 bg-white dark:bg-gray-700 text-pink-500 dark:text-pink-400 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white">
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Trending Hashtags</h4>
        <div className="flex flex-wrap gap-2">
          {suggestions.hashtags.map((hashtag, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-300 transition-colors cursor-pointer"
            >
              {hashtag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSuggestions;