import ReactMarkdown from 'react-markdown';

const CommunityDetails = ({ community }) => (
  <div className="flex-1 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{community.name}</h2>
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">About</h3>
      <div className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none">
        <ReactMarkdown>{community.details}</ReactMarkdown>
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Posts</h3>
    <div className="space-y-4">
      {community.posts.map((post) => (
        <div
          key={post.id}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4"
        >
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {post.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{post.content}</p>
        </div>
      ))}
    </div>
  </div>
);
export default CommunityDetails;