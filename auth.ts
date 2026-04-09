import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // o Google, credentials, etc.

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [GitHub],
});