import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, field, value, onSave }) => {
  const [editValue, setEditValue] = useState(value);

  // Reset the edit value when the field or value changes
  useEffect(() => {
    setEditValue(value);
  }, [field, value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editValue);
    onClose();
  };

  const getFieldLabel = () => {
    const label = field.replace('healthData.', '');
    return label.charAt(0).toUpperCase() + label.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const renderFormField = () => {
    // For boolean fields (organDonorStatus)
    if (field === 'healthData.organDonorStatus') {
      return (
        <select
          value={editValue === true ? 'true' : 'false'}
          onChange={(e) => setEditValue(e.target.value === 'true')}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all duration-200"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }

    // For array fields (chronicConditions, medicalHistory)
    if (field === 'healthData.chronicConditions' || field === 'healthData.medicalHistory') {
      const arrayValue = Array.isArray(editValue) ? editValue.join(', ') : '';
      return (
        <textarea
          value={arrayValue}
          onChange={(e) => {
            const inputValue = e.target.value;
            const newArray = inputValue ? inputValue.split(',').map((item) => item.trim()) : [];
            setEditValue(newArray);
          }}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all duration-200"
          rows={4}
          placeholder="Enter comma-separated values"
        />
      );
    }

    // For text fields (displayName, email, phoneNumber, location, bloodType)
    return (
      <input
        type={field === 'email' ? 'email' : 'text'}
        value={editValue || ''}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all duration-200"
      />
    );
  };

  const getHelpText = () => {
    switch (field) {
      case 'healthData.chronicConditions':
        return 'Enter conditions separated by commas';
      case 'healthData.medicalHistory':
        return 'Enter medical history items separated by commas';
      case 'healthData.bloodType':
        return 'Example: A+, B-, O+, AB+';
      case 'email':
        return 'Your email address is used for account access';
      default:
        return null;
    }
  };

  const helpText = getHelpText();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-sm animate-fade-in-slow"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in border border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Edit {getFieldLabel()}
            </h3>
            <button
              onClick={onClose}
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
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getFieldLabel()}
              </label>
              {renderFormField()}
              {helpText && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">{helpText}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;