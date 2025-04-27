import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPlus } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const CreationForm = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onMediaUpload,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  title,
  setTitle,
  description,
  setDescription,
  tags,
  onAddTagClick,
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const simplemde = editorRef.current.simplemde;
      if (simplemde) {
        simplemde.codemirror.on('change', () => {
          setDescription(simplemde.getValue());
        });
      }
    }
  }, [setDescription]);

  return (
    <>
      <div className="block md:hidden mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Category
        </label>
        <select
          value={selectedCategory}
          onChange={onCategoryChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
          <option value="add-new">Add new section</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center mb-4 sm:mb-6 transition-all duration-300 ${
            isDragging ? 'border-pink-500 bgpink-500/10' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <label htmlFor="media-upload" className="cursor-pointer">
            <FontAwesomeIcon icon={faVideo} className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Click to upload or drag and drop <br />
              SVG, PNG, JPG, GIF, or MP4 (max. 1280x800px)
            </p>
          </label>
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            onChange={onMediaUpload}
            className="hidden"
            multiple
          />
        </div>

        <div className="mb-4 sm:mb-6 relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 pt-5 sm:pt-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ringpink-500 focus:border-transparent transition-all duration-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="title"
            className="absolute left-3 top-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-pink-500"
          >
            Story Title
          </label>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Markdown Supported)
          </label>
          <div className="relative">
            <SimpleMDE
              key="markdown-editor"
              ref={editorRef}
              value={description}
              onChange={setDescription}
              options={{
                placeholder: 'Write your description here... (Markdown supported)',
                toolbar: ['bold', 'italic', 'heading', 'link', 'unordered-list', 'preview'],
                spellChecker: false,
                autofocus: true,
                minHeight: '60px',
                maxHeight: '100px',
              }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-2 sm:px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all duration-300"
            >
              {tag}
            </button>
          ))}
          <button
            onClick={onAddTagClick}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CreationForm;