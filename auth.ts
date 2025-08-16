import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  })],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.githubId = profile.id
      }
      return token
    },
    async session({ session, token }) {
        console.log(token);
      session.user.id = token.githubId as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      return session
    },
  },
})

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [],
// })