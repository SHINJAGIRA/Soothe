'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

const useAuthMiddleware = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const userSession = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
  const isGuestRoute = pathname === '/signin' || pathname === '/signup';

  useEffect(() => {
    if (!loading) {
      const isAuthenticatedUser = user || userSession;

      if (isAuthenticatedUser) {
        // Redirect authenticated users away from /signin and /signup
        if (pathname === '/signin' || pathname === '/signup') {
          router.replace('/'); // Immediate redirect to dashboard
        }
        setIsAuthenticated(true); // Allow rendering for protected routes or during redirect
      } else {
        // Allow unauthenticated users to access /signin and /signup
        if (pathname === '/signin' || pathname === '/signup') {
          setIsAuthenticated(false);
        } else {
          // Redirect unauthenticated users to /signin for protected routes
          setIsAuthenticated(false);
          router.replace('/signin');
        }
      }
    }
  }, [user, loading, userSession, pathname, router]);

  return { isAuthenticated, loading, isGuestRoute };
};

export default useAuthMiddleware;