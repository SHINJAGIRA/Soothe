import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({ onShareClick }) => (
  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 shadow-lg">
    <div className="text-2xl font-bold text-white">Create a Story</div>
    <div className="flex space-x-3">
      <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/30 transition-all duration-300">
        <FontAwesomeIcon icon={faSave} className="mr-2" />
        Save
      </button>
      <button
        onClick={onShareClick}
        className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/30 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
        Share
      </button>
    </div>
  </div>
);

export default TopBar;