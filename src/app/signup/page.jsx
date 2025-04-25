'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/firebase';
import Input from '@/components/Input';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const RegisterForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log("Register session state:", { status, session });
    if (status === 'authenticated') {
      console.log("Redirecting to /dashboard: User is authenticated");
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('cpassword');

    console.log("Attempting registration with:", { email });

    if (password !== confirmPassword) {
      console.log("Registration error: Passwords do not match");
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Firebase user created:", { uid: user.uid, email: user.email });

      await sendEmailVerification(user);
      console.log("Email verification sent to:", email);

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.log("Sign-in error after registration:", result.error);
        let errorMessage = 'An error occurred during sign-in.';
        if (result.error.includes('Invalid credentials')) {
          errorMessage = 'Invalid email or password.';
        } else if (result.error.includes('auth/invalid-email')) {
          errorMessage = 'Invalid email format.';
        }
        setError(errorMessage);
      } else {
        console.log("Registration and sign-in successful");
        setSuccess('Registration successful! Please check your email for verification.');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.log("Registration error:", error.code, error.message);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      setError(errorMessage);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setSuccess('');
    console.log("Attempting social login with:", provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-500 dark:text-pink-400 tracking-tight">
              Soothe-Signup
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              Welcome! Register to continue
            </p>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-500 dark:text-pink-400"
            >
              Email
            </label>
            <Input type="email" name="email" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-500 dark:text-pink-400"
            >
              Password
            </label>
            <Input type="password" name="password" id="password" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium text-pink-500 dark:text-pink-400"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm password"
            />
          </div>
          {error && (
            <div
              className="text-red-500 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/30 rounded-xl py-3 px-4"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="text-green-500 dark:text-green-400 text-sm text-center bg-green-50 dark:bg-green-900/30 rounded-xl py-3 px-4"
            >
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
            href="/login"
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