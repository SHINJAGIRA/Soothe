import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

// Validate environment variables
const requiredEnvVars = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "FACEBOOK_CLIENT_ID",
  "FACEBOOK_CLIENT_SECRET",
  "TWITTER_CLIENT_ID",
  "TWITTER_CLIENT_SECRET",
  "NEXTAUTH_SECRET",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
});

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // Ensure compatibility with X API
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your authentication logic here (e.g., check against a database)
        // Example: Validate email and password
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Replace with actual database lookup
        const user = {
          id: "1",
          email: credentials.email,
          name: "Test User",
        };

        // Simulate password check (replace with real validation, e.g., bcrypt)
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on initial sign-in
      if (user) {
        token.id = user.id || user.email; // Fallback to email if id is not provided
      }
      return token;
    },
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const isAuthenticated = !!auth?.user;

      const publicRoutes = ["/", "/login", "/register"];

      if (isAuthenticated && publicRoutes.includes(pathname)) {
        return Response.redirect(new URL("/dashboard", request.url));
      }

      if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return Response.redirect(new URL("/login", request.url));
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    // signUp: "/register", // Removed as NextAuth does not support signUp page natively
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug in development
};