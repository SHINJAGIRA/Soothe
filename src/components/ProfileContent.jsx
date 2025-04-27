'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const ProfileContent = ({ user, activeSection, openEditModal }) => {
    const router = useRouter();
  const EditButton = ({ field, value }) => (
    <button
      onClick={() => openEditModal(field, value)}
      className="text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors ml-2"
      aria-label={`Edit ${field}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    </button>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6 animate-slide-in">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Personal Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">{user.displayName || 'Not set'}</p>
            <EditButton field="displayName" value={user.displayName || ''} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
            <EditButton field="email" value={user.email} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">{user.phoneNumber || 'Not set'}</p>
            <EditButton field="phoneNumber" value={user.phoneNumber || ''} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">
              {user.location ? (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {user.location}
                </span>
              ) : (
                'Not set'
              )}
            </p>
            <EditButton field="location" value={user.location || ''} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
          <p className="text-gray-800 dark:text-gray-200">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
          <p className="text-gray-800 dark:text-gray-200">
            {new Date(user.lastLoginAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );

  const renderCommunities = () => (
    <div className="space-y-4 animate-slide-in">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Communities</h3>
      {user.communities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {user.communities.map((community, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 rounded-full text-sm"
            >
              {community}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 italic">No communities joined yet.</p>
      )}
      <button
        onClick={() => openEditModal('communities', user.communities)}
        className="mt-4 inline-flex items-center text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        Edit Communities
      </button>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-4 animate-slide-in">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">My Posts</h3>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 text-center">
        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-2">
          {user.postCount > 0 ? `${user.postCount} Posts` : 'No posts yet'}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {user.postCount > 0 ? 'Your posts would be displayed here' : 'Share your health journey with the community'}
        </p>
        <button
          onClick={() => router.push('/create')}
          className="mt-4 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
        >
          Create First Post
        </button>
      </div>
    </div>
  );

  const renderHealthData = () => (
    <div className="space-y-6 animate-slide-in">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Health Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chronic Conditions</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">
              {user.healthData.chronicConditions?.length > 0
                ? user.healthData.chronicConditions.join(', ')
                : 'None'}
            </p>
            <EditButton field="healthData.chronicConditions" value={user.healthData.chronicConditions} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Blood Type</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">{user.healthData.bloodType || 'Not set'}</p>
            <EditButton field="healthData.bloodType" value={user.healthData.bloodType || ''} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Organ Donor</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">{user.healthData.organDonorStatus ? 'Yes' : 'No'}</p>
            <EditButton field="healthData.organDonorStatus" value={user.healthData.organDonorStatus} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Medical History</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">
              {user.healthData.medicalHistory?.length > 0
                ? user.healthData.medicalHistory.join(', ')
                : 'None'}
            </p>
            <EditButton field="healthData.medicalHistory" value={user.healthData.medicalHistory} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCredibility = () => (
    <div className="space-y-6 animate-slide-in">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Credibility</h3>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
          <div className="flex items-center">
            <div
              className={`flex items-center ${
                user.isCredible ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full mr-2 ${user.isCredible ? 'bg-green-500' : 'bg-gray-400'}`}
              ></div>
              <p className="text-gray-800 dark:text-gray-200">
                {user.isCredible ? 'Verified' : 'Not Verified'}
              </p>
            </div>
            <EditButton field="isCredible" value={user.isCredible} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Credibility Details</p>
          <div className="flex items-center">
            <p className="text-gray-800 dark:text-gray-200">
              {user.credibilityDetails || 'No credentials added'}
            </p>
            <EditButton field="credibilityDetails" value={user.credibilityDetails || ''} />
          </div>
        </div>
        {!user.isCredible && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-sm">
            Becoming a verified member helps establish trust in the community. Add your professional
            credentials to get verified.
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personalInfo':
        return renderPersonalInfo();
      case 'communities':
        return renderCommunities();
      case 'posts':
        return renderPosts();
      case 'healthData':
        return renderHealthData();
      case 'credibility':
        return renderCredibility();
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ProfileContent;