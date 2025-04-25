import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANf5u89J_wuIMK_e6Fw9w-lE0g75iGQiA",
  authDomain: "soothe-47de1.firebaseapp.com",
  databaseURL: "https://soothe-47de1-default-rtdb.firebaseio.com",
  projectId: "soothe-47de1",
  storageBucket: "soothe-47de1.firebasestorage.app",
  messagingSenderId: "1075651197699",
  appId: "1:1075651197699:web:99c75b6541efa064040736",
  measurementId: "G-N20W7QP1G2",
};

const app = initializeApp(firebaseConfig);
const firebase_auth = getAuth(app);
const firestore = getFirestore(app);

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET:", !!process.env.NEXTAUTH_SECRET ? "Set" : "Not set");

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: FirestoreAdapter(firestore),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    {
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorizing credentials:", { email: credentials.email });
          const userCredential = await signInWithEmailAndPassword(
            firebase_auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;
          console.log("Authorization successful:", { id: user.uid, email: user.email });
          return {
            id: user.uid,
            email: user.email,
            name: user.displayName,
          };
        } catch (error) {
          console.error("Authorize Error:", error.code, error.message);
          throw new Error("Invalid credentials");
        }
      },
    },
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        console.log("JWT callback:", { token, user });
      }
      return token;
    },
    async session({ session, token }) {
      try {
        console.log("Session callback input:", { session, token });
        if (token) {
          session.user = {
            id: token.id,
            email: token.email,
            name: token.name,
          };
          const userDoc = await getDoc(doc(firestore, "users", token.id));
          if (userDoc.exists()) {
            session.user.profile = userDoc.data();
          }
        }
        console.log("Session callback output:", session);
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        return session;
      }
    },
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback:", { user, account });
        const userRef = doc(firestore, "users", user.id);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            email: user.email,
            name: user.name || "",
            createdAt: new Date().toISOString(),
            diseases: [],
            bloodType: "",
            organDonor: false,
            bloodDonor: false,
            medicalHistory: "",
            emergencyContact: "",
          });
          console.log("Created Firestore user document:", user.id);
        }
        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },
  },
});