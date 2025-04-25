'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const LoginForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Login session state:", { status, session });
    if (status === 'authenticated') {
      console.log("Redirecting to /dashboard: User is authenticated");
      router.push('/dashboard');
    }
  }, [status, router, session]);

  const loginTheUser = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log("Attempting login with:", { email });

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log("Login error:", result.error);
      let errorMessage = 'An error occurred. Please try again.';
      if (result.error.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password.';
      } else if (result.error.includes('auth/invalid-email')) {
        errorMessage = 'Invalid email format.';
      } else if (result.error.includes('auth/user-disabled')) {
        errorMessage = 'This account has been disabled.';
      } else if (result.error.includes('auth/too-many-requests')) {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      setError(errorMessage);
    } else {
      console.log("Login successful, redirecting to /dashboard");
      router.push('/dashboard');
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    console.log("Attempting social login with:", provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
        <form onSubmit={loginTheUser} className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-pink-500 dark:text-pink-400 tracking-tight">
              Soothe-Login
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              Welcome back! Sign in to continue
            </p>
          </div>

          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-500 dark:text-pink-400"
            >
              Email
            </label>
            <Input type="text" name="email" id="email" placeholder="Enter email" />
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

          {error && (
            <div
              className="text-red-500 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/30 rounded-xl py-3 px-4"
            >
              {error}
            </div>
          )}

          <Button label="Sign In" type="submit" />
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
              tooltip="Sign in with Google"
              onClick={() => handleSocialLogin('google')}
              label="Google"
            />
            <IconButton
              icon={faFacebook}
              tooltip="Sign in with Facebook"
              onClick={() => handleSocialLogin('facebook')}
              label="Facebook"
            />
            <IconButton
              icon={faTwitter}
              tooltip="Sign in with Twitter"
              onClick={() => handleSocialLogin('twitter')}
              label="Twitter"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Do not have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;