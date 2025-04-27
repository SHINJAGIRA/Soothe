import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, fComment, faPaperPlane, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const PreviewModal = ({
  isOpen,
  onClose,
  mediaFiles,
  currentMediaIndex,
  setCurrentMediaIndex,
  title,
  description,
}) => {
  if (!isOpen) return null;

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Preview</h2>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center p- at-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">U</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">username</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>

            {mediaFiles.length > 0 ? (
              <>
                <div className="relative">
                  {mediaFiles[currentMediaIndex].type === 'video' ? (
                    <video
                      src={mediaFiles[currentMediaIndex].url}
                      controls
                      className="w-full h-64 sm:h-72 object-cover rounded-t-2xl"
                    />
                  ) : (
                    <img
                      src={mediaFiles[currentMediaIndex].url}
                      alt="Post media"
                      className="w-full h-64 sm:h-72 object-cover rounded-t-2xl"
                    />
                  )}
                  {mediaFiles.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevMedia}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-200 rounded-full p-2 sm:p-3 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                      <button
                        onClick={handleNextMedia}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-200 rounded-full p-2 sm:p-3 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {mediaFiles.map((media, index) => (
                          <img
                            key={index}
                            src={media.type === 'video' ? '/video-placeholder.png' : media.url}
                            alt="Thumbnail"
                            className={`w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg border-2 ${
                              index === currentMediaIndex
                                ? 'border-pink-500'
                                : 'border-gray-200 dark:border-gray-700'
                            } cursor-pointer transition-all duration-300`}
                            onClick={() => setCurrentMediaIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <button className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300">
                      <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300">
                      <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300">
                      <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1,234 likes</p>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
                    {title || 'Story Title'}
                  </h3>
                  <div className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{description || 'Write a short description here...'}</ReactMarkdown>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
                  {title || 'Story Title'}
                </h3>
                <div className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none text-center">
                  <ReactMarkdown>{description || 'Write a short description here...'}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;