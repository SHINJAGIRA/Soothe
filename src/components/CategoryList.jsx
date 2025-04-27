import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onAddCategoryClick,
}) => (
  <>
    <h2 className="text-2xl font-bold text-pink-500 dark:text-pink-400 mb-6">Categories</h2>
    <ul className="space-y-4">
      {categories.map((category) => (
        <li
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-white/30 dark:bg-gray-700/30 backdrop-blur-md border border-pink-500 text-pink-500 dark:text-pink-400 shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={category.icon} className="w-6 h-6 mr-3" />
          <span className="font-medium">{category.title}</span>
        </li>
      ))}
      <li
        onClick={onAddCategoryClick}
        className="flex items-center p-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faPlus} className="w-6 h-6 mr-3 text-gray-500" />
        <span className="font-medium text-gray-500">Add new section</span>
      </li>
    </ul>
  </>
);

export default CategoryList;