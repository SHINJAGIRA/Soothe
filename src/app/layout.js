'use client';

import { Sulphur_Point } from 'next/font/google';
import useAuthMiddleware from '@/utils/authMiddleware';
import NavBar from '@/components/NavBar';
import './globals.css';

const sulphurPoint = Sulphur_Point({
  weight: ['300', '400', '700'],
  variable: '--font-sulphur-point',
  subsets: ['latin'],
});

const GuestLayout = ({ children }) => (
  <html lang="en">
    <body className={`${sulphurPoint.variable} antialiased`}>
      <main>{children}</main>
    </body>
  </html>
);

const AuthenticatedLayout = ({ children }) => (
  <html lang="en">
    <body className={`${sulphurPoint.variable} antialiased min-h-screen`}>
      {/* Wrapper to handle layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* NavBar is fixed, so it doesn't affect the flow of other elements */}
        <NavBar />
        
        {/* Main content takes remaining space */}
        <main className="flex-1 lg:pl-72 sm:pl-20 pl-0 sm:pt-0 pt-16 lg:pt-0 pb-16 sm:pb-0">
          {children}
        </main>
      </div>
    </body>
  </html>
);

export default function RootLayout({ children }) {
  const { isAuthenticated, loading, isGuestRoute } = useAuthMiddleware();

  if (loading || isAuthenticated === null) {
    return (
      <html lang="en">
        <body className={`${sulphurPoint.variable} antialiased`}>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
            <p className="text-pink-500 dark:text-pink-400 text-lg">Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  // Show loading for authenticated users on guest routes during redirect
  if (isAuthenticated && isGuestRoute) {
    return (
      <html lang="en">
        <body className={`${sulphurPoint.variable} antialiased`}>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
            <p className="text-pink-500 dark:text-pink-400 text-lg">Redirecting...</p>
          </div>
        </body>
      </html>
    );
  }

  // Use GuestLayout for unauthenticated users on /signin or /signup
  if (!isAuthenticated && isGuestRoute) {
    return <GuestLayout>{children}</GuestLayout>;
  }

  // Use AuthenticatedLayout for authenticated users on protected routes
  if (isAuthenticated) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }

  // Fallback: should not reach here due to middleware redirects
  return null;
}