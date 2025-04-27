'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setLogLevel } from 'firebase/firestore';

// Enable Firestore debug logging
setLogLevel('debug');

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Profile picture selected:', file.name);
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      console.log('No profile picture selected');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;

    if (password !== cpassword) {
      setError('Passwords do not match!');
      console.log('Password mismatch:', { password, cpassword });
      return;
    }

    try {
      console.log('Starting registration process...');

      // Step 1: Create user with email and password
      console.log('Step 1: Creating user with email and password...');
      const userCredential = await createUserWithEmailAndPassword(email, password);
      if (!userCredential?.user) {
        setError('Failed to create account. Please try again.');
        console.error('User creation failed: No user returned from createUserWithEmailAndPassword');
        return;
      }

      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      // Step 2: Upload profile picture to Firebase Storage if provided
      let profilePictureUrl = null;
      if (profilePicture) {
        console.log('Step 2: Uploading profile picture...');
        const storagePath = ref(storage, `users/${user.uid}/profile.jpg`);
        const uploadResult = await uploadBytes(storagePath, profilePicture);
        console.log('Profile picture uploaded:', uploadResult.metadata.fullPath);
        profilePictureUrl = await getDownloadURL(storagePath);
        console.log('Profile picture URL:', profilePictureUrl);
      } else {
        console.log('Step 2: No profile picture to upload, skipping...');
      }

      // Step 3: Save user data to Firestore
      console.log('Step 3: Saving user data to Firestore...');
      const providerData = user.providerData.map((provider) => ({
        providerId: provider.providerId,
        uid: provider.uid,
        displayName: provider.displayName || null,
        email: provider.email || null,
        phoneNumber: provider.phoneNumber || null,
        photoURL: provider.photoURL || null,
      }));

      const userDocRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userDocRef, {
          // Firebase Authentication fields
          uid: user.uid,
          email: user.email || null,
          emailVerified: user.emailVerified || false,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          phoneNumber: user.phoneNumber || null,
          providerData: providerData || [],
          createdAt: user.metadata.creationTime || new Date().toISOString(),
          lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString(),

          // App-specific fields
          profilePicture: profilePictureUrl || null,
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
        console.log('User data saved to Firestore successfully for UID:', user.uid);
      } catch (firestoreError) {
        console.error('Firestore write failed:', firestoreError);
        setError('Failed to save user data to Firestore: ' + firestoreError.message);
        return;
      }

      // All steps completed successfully, set success message and redirect
      setSuccess('Account created successfully!');
      console.log('Registration completed successfully, redirecting to /signin...');
      router.push('/signin');
    } catch (error) {
      console.error('Registration error:', error);
      setError(`Failed to complete registration: ${error.message}`);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl pt-16 pb-8 px-8 transform transition-all duration-500 hover:shadow-3xl">
        {/* Profile Picture Upload */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
                )}
              </div>
            </div>
            <label
              htmlFor="profilePicture"
              className="absolute bottom-2 w-10 h-10 text-center right-2 bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-400 rounded-full p-2 cursor-pointer shadow-md hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white transition-all duration-300 group-hover:scale-110"
            >
              <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-500 dark:text-pink-400 tracking-tight">
              Soothe-Signup
            </h2>
          </div>

          <div className="form-group">
            <Input type="email" name="email" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <Input type="password" name="password" id="password" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm password"
            />
          </div>
          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/30 rounded-xl py-3 px-4">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 dark:text-green-400 text-sm text-center bg-green-50 dark:bg-green-900/30 rounded-xl py-3 px-4">
              {success}
            </div>
          )}
          <Button label="Register" type="submit" />
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 mx-auto w-3/5 gap-6">
            <IconButton
              icon={faGoogle}
              tooltip="Sign up with Google"
              onClick={() => handleSocialLogin('google')}
              label="Google"
            />
            <IconButton
              icon={faFacebook}
              tooltip="Sign up with Facebook"
              onClick={() => handleSocialLogin('facebook')}
              label="Facebook"
            />
            <IconButton
              icon={faTwitter}
              tooltip="Sign up with Twitter"
              onClick={() => handleSocialLogin('twitter')}
              label="Twitter"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-medium text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;