import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    GitHubProvider({
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: { signin: "/signin" },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
