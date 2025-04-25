'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import Input from '@/components/Input';
import Button from '@/components/Button';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    diseases: [],
    bloodType: '',
    organDonor: false,
    bloodDonor: false,
    medicalHistory: '',
    emergencyContact: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.id) {
      const fetchProfile = async () => {
        const userDoc = await getDoc(doc(firestore, 'users', session.user.id));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        }
      };
      fetchProfile();
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(firestore, 'users', session.user.id), profile, { merge: true });
      setError('');
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDiseasesChange = (e) => {
    const diseases = e.target.value.split(',').map((d) => d.trim());
    setProfile((prev) => ({ ...prev, diseases }));
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-pink-500 dark:text-pink-400 text-center mb-6">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="diseases" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Diseases (comma-separated)
            </label>
            <Input
              type="text"
              name="diseases"
              value={profile.diseases.join(', ')}
              onChange={handleDiseasesChange}
              placeholder="e.g., Diabetes, Hypertension"
            />
          </div>
          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Blood Type
            </label>
            <Input
              type="text"
              name="bloodType"
              value={profile.bloodType}
              onChange={handleInputChange}
              placeholder="e.g., A+"
            />
          </div>
          <div>
            <label htmlFor="organDonor" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Organ Donor
            </label>
            <input
              type="checkbox"
              name="organDonor"
              checked={profile.organDonor}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="bloodDonor" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Blood Donor
            </label>
            <input
              type="checkbox"
              name="bloodDonor"
              checked={profile.bloodDonor}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="medicalHistory" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={profile.medicalHistory}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              placeholder="Enter medical history"
            />
          </div>
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-pink-500 dark:text-pink-400">
              Emergency Contact
            </label>
            <Input
              type="text"
              name="emergencyContact"
              value={profile.emergencyContact}
              onChange={handleInputChange}
              placeholder="Enter emergency contact"
            />
          </div>
          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/30 rounded-xl py-3 px-4">
              {error}
            </div>
          )}
          <Button label="Save Profile" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;