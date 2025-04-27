'use client';

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileContent from '@/components/ProfileContent';
import ProfileSuggestions from '@/components/ProfileSuggestions';
import EditModal from '@/components/EditModal';

const ProfilePage = () => {
  const [user, setUser] = useState({
    uid: 'kXSoiSNc2vS08q6wT7aVS1l8C3I3',
    email: 'germainsyncher@gmail.com',
    emailVerified: false,
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    providerData: [
      {
        displayName: null,
        email: 'germainsyncher@gmail.com',
        phoneNumber: null,
        photoURL: null,
        providerId: 'password',
        uid: 'germainsyncher@gmail.com',
      },
    ],
    createdAt: 'Sat, 26 Apr 2025 16:42:41 GMT',
    lastLoginAt: 'Sat, 26 Apr 2025 16:42:41 GMT',
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/fir-auth-6de3c.firebasestorage.app/o/users%2FkXSoiSNc2vS08q6wT7aVS1l8C3I3%2Fprofile.jpg?alt=media&token=a7b47c97-b493-43df-a693-9e6bb86fc37c',
    postCount: 0,
    healthData: {
      chronicConditions: [],
      bloodType: null,
      organDonorStatus: false,
      medicalHistory: [],
    },
    communities: [],
    isCredible: false,
    credibilityDetails: null,
  });

  // UI state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageModalField, setMessageModalField] = useState('');
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState(null);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample suggestions
  const suggestions = {
    communities: ['Health Enthusiasts', 'Wellness Warriors', 'Medical Professionals'],
    hashtags: ['#HealthJourney', '#WellnessWednesday', '#MedicalTech', '#HealthyHabits'],
  };

  // Section configurations for the sidebar
  const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: 'user' },
    { id: 'communities', label: 'Communities', icon: 'users', count: user.communities.length },
    { id: 'posts', label: 'My Posts', icon: 'fileText', count: user.postCount },
    { id: 'healthData', label: 'Health Data', icon: 'heart' },
    { id: 'credibility', label: 'Credibility', icon: 'shield' },
  ];

  // Update user data
  const updateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  // Open edit modal (only for Personal Info and Health Data)
  const openEditModal = (field, value) => {
    if (
      field === 'displayName' ||
      field === 'email' ||
      field === 'phoneNumber' ||
      field === 'location' ||
      field.startsWith('healthData.')
    ) {
      setEditField(field);
      setEditValue(value);
      setIsEditModalOpen(true);
    } else {
      setMessageModalField(field);
      setIsMessageModalOpen(true);
    }
  };

  // Handle edit form submission
  const handleEditSave = (newValue) => {
    if (editField.startsWith('healthData.')) {
      const subField = editField.split('.')[1];
      updateUser({
        healthData: {
          ...user.healthData,
          [subField]: newValue,
        },
      });
    } else {
      updateUser({ [editField]: newValue });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 dark:bg-gray-850 flex flex-col items-center animate-fade-in">
      {/* Profile Header */}
      <ProfileHeader user={user} updateUser={updateUser} />

      {/* Main Layout */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Mobile Menu Button (only visible on small screens) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center justify-center p-2 rounded-md text-pink-500 hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="ml-2 font-medium">Menu</span>
          </button>
        </div>

        {/* Sidebar */}
        <ProfileSidebar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-850 p-6 animate-slide-in">
            <ProfileContent
              user={user}
              activeSection={activeSection}
              openEditModal={openEditModal}
            />
          </div>
        </div>

        {/* Suggestions - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <ProfileSuggestions suggestions={suggestions} />
        </div>

        {/* Suggestions - Mobile & Tablet */}
        <div className="lg:hidden w-full mt-6">
          <ProfileSuggestions suggestions={suggestions} />
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        field={editField}
        value={editValue}
        onSave={handleEditSave}
      />

      {/* Message Modal for non-editable fields */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm animate-fade-in-fast"
            onClick={() => setIsMessageModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in border border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Update {messageModalField.charAt(0).toUpperCase() + messageModalField.slice(1)}
                </h3>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This field can be updated from its respective page:
              </p>
              <ul className="mt-2 text-gray-800 dark:text-gray-200 space-y-2">
                {messageModalField === 'communities' && (
                  <li>Go to Communities page to join or leave communities.</li>
                )}
                {(messageModalField === 'isCredible' || messageModalField === 'credibilityDetails') && (
                  <li>Go to Verification page to update credibility status.</li>
                )}
                {messageModalField === 'posts' && (
                  <li>Go to Posts page to create or manage your posts.</li>
                )}
              </ul>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;