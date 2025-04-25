import { collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

export function CustomFirestoreAdapter(firestore) {
  return {
    // Create a new user
    async createUser(user) {
      const userRef = doc(firestore, "users", user.id);
      await setDoc(userRef, user);
      return user;
    },

    // Get a user by ID
    async getUser(id) {
      const userRef = doc(firestore, "users", id);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    },

    // Get a user by email (requires a query)
    async getUserByEmail(email) {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      return querySnapshot.docs[0].data();
    },

    // Get a user by provider account ID
    async getUserByAccount({ provider, providerAccountId }) {
      const accountRef = doc(firestore, "accounts", `${provider}:${providerAccountId}`);
      const accountDoc = await getDoc(accountRef);
      if (!accountDoc.exists()) return null;
      const userRef = doc(firestore, "users", accountDoc.data().userId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    },

    // Update a user
    async updateUser(user) {
      const userRef = doc(firestore, "users", user.id);
      await setDoc(userRef, user, { merge: true });
      return user;
    },

    // Delete a user
    async deleteUser(id) {
      const userRef = doc(firestore, "users", id);
      await deleteDoc(userRef);
    },

    // Link a provider account
    async linkAccount(account) {
      const accountRef = doc(firestore, "accounts", `${account.provider}:${account.providerAccountId}`);
      await setDoc(accountRef, account);
      return account;
    },

    // Unlink a provider account
    async unlinkAccount({ provider, providerAccountId }) {
      const accountRef = doc(firestore, "accounts", `${provider}:${providerAccountId}`);
      await deleteDoc(accountRef);
    },

    // Create a session
    async createSession(session) {
      const sessionRef = doc(firestore, "sessions", session.sessionToken);
      await setDoc(sessionRef, session);
      return session;
    },

    // Get a session and user
    async getSessionAndUser(sessionToken) {
      const sessionRef = doc(firestore, "sessions", sessionToken);
      const sessionDoc = await getDoc(sessionRef);
      if (!sessionDoc.exists()) return null;
      const session = sessionDoc.data();
      const userRef = doc(firestore, "users", session.userId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? { session, user: userDoc.data() } : null;
    },

    // Update a session
    async updateSession(session) {
      const sessionRef = doc(firestore, "sessions", session.sessionToken);
      await setDoc(sessionRef, session, { merge: true });
      return session;
    },

    // Delete a session
    async deleteSession(sessionToken) {
      const sessionRef = doc(firestore, "sessions", sessionToken);
      await deleteDoc(sessionRef);
    },

    // Create a verification token
    async createVerificationToken(token) {
      const tokenRef = doc(firestore, "verificationTokens", token.identifier);
      await setDoc(tokenRef, token);
      return token;
    },

    // Use a verification token
    async useVerificationToken({ identifier }) {
      const tokenRef = doc(firestore, "verificationTokens", identifier);
      const tokenDoc = await getDoc(tokenRef);
      if (!tokenDoc.exists()) return null;
      await deleteDoc(tokenRef);
      return tokenDoc.data();
    },
  };
}