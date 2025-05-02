'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      setNotifications([
        { id: 1, icon: '❤️', message: 'Someone liked your post' },
        { id: 2, icon: '👥', message: 'You have a new companion' },
        { id: 3, icon: '✅', message: 'Your profile was updated successfully' },
        { id: 9, icon: '🩸', message: 'A donor connected with you' },

        { id: 8, icon: '🌈', message: 'Your positive story touched 10 hearts today' },
        { id: 4, icon: '📷', message: 'Update your profile picture to inspire others' },
        { id: 5, icon: '📝', message: 'Complete your bio to share your journey' },
        { id: 6, icon: '🎉', message: "Congrats! You've reached a new milestone" },
        { id: 7, icon: '💬', message: 'You have a new message from a companion' },
      ]);
    }
  }, [session, status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-pink-600 dark:text-pink-400 text-center mb-2">
            Hey {session?.user?.name?.split(' ')[0] || 'Friend'}! 👋
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Here’s what’s happening today
          </p>
          <ul className="space-y-5">
            {notifications.map((notification) => (
              <motion.li
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: notification.id * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 bg-pink-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer"
              >
                <span className="text-2xl">{notification.icon}</span>
                <span className="text-gray-800 dark:text-gray-200 text-lg">
                  {notification.message}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
