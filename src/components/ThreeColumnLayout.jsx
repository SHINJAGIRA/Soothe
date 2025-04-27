const ThreeColumnLayout = ({ left, center, right }) => (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar: Hidden on sm, Visible on md and lg */}
      <div className="hidden md:block md:w-1/4 lg:w-1/4 p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        {left}
      </div>
      {/* Center: Full width on sm, Adjusts on md and lg */}
      <div className="w-full md:w-3/4 lg:w-1/2 p-4 sm:p-6 bg-gray-50 dark:bg-gray-850 flex flex-col">
        {center}
      </div>
      {/* Right: Visible only on lg */}
      <div className="hidden lg:block lg:w-1/4 p-6 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
        {right}
      </div>
    </div>
  );
  
  export default ThreeColumnLayout;