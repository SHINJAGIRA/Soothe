import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CommunityList = ({ communities, selectedCommunityId, onSelectCommunity }) => (
  <>
    <h2 className="text-2xl font-bold text-pink-500 dark:text-pink-400 mb-6">Communities</h2>
    <ul className="space-y-4">
      {communities.map((community) => (
        <li
          key={community.id}
          onClick={() => onSelectCommunity(community)}
          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            selectedCommunityId === community.id
              ? 'bg-white/30 dark:bg-gray-700/30 backdrop-blur-md border border-pink-500 text-pink-500 dark:text-pink-400 shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <img
            src={community.avatar}
            alt={`${community.name} avatar`}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">{community.name}</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">{community.description}</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 text-gray-500" />
        </li>
      ))}
    </ul>
  </>
);

export default CommunityList;