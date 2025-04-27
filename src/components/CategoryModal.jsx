import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faVideo, faImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const CategoryModal = ({
  isOpen,
  onClose,
  newCategoryTitle,
  setNewCategoryTitle,
  newCategoryIcon,
  setNewCategoryIcon,
  onAddCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Add New Category</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Title
            </label>
            <input
              type="text"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter category title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Icon
            </label>
            <select
              value={newCategoryIcon.iconName}
              onChange={(e) => {
                const selectedIcon = [faVideo, faImage, faFileAlt].find(
                  (icon) => icon.iconName === e.target.value
                );
                setNewCategoryIcon(selectedIcon);
              }}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
            >
              <option value={faVideo.iconName}>Video</option>
              <option value={faImage.iconName}>Image</option>
              <option value={faFileAlt.iconName}>File</option>
            </select>
          </div>
          <button
            onClick={onAddCategory}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;