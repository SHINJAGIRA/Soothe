'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Dashboard session state:", { status, session });
    if (status === 'unauthenticated') {
      console.log("Redirecting to /login: User is unauthenticated");
      router.push('/login');
    }
  }, [status, router, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    console.log("No session: Returning null (middleware should redirect)");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-pink-500 dark:text-pink-400 tracking-tight text-center">
          Welcome to Your Dashboard
        </h2>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300 text-center">
          Hello, {session.user.email}!
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-xl hover:bg-pink-600 transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}