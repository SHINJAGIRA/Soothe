import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TagModal = ({ isOpen, onClose, newTag, setNewTag, onAddTag }) => {
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
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Add New Tag</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tag Name
            </label>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter tag name"
            />
          </div>
          <button
            onClick={onAddTag}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagModal;