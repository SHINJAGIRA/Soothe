const CommunityRules = ({ rules }) => (
    <>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Community Rules</h2>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
        <ul className="space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="text-sm text-gray-800 dark:text-gray-200">
              {index + 1}. {rule}
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300">
        Join Community
      </button>
    </>
  );
  
  export default CommunityRules;