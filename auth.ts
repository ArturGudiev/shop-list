import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // Trust the host header to prevent redirect issues
  providers: [GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  })],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.githubId = profile.id
        token.email = (profile.email as string | undefined) || user?.email || token.email
        token.name = (profile.name as string | undefined) || user?.name || token.name
        token.picture = ((profile as any).avatar_url as string | undefined) || user?.image || token.picture
      }
      return token
    },
    async session({ session, token }) {
      // Ensure session.user exists - create it if it doesn't
      if (!session.user) {
        session.user = {} as any;
      }
      
      // Assign properties from token
      if (token.githubId) {
        session.user.id = token.githubId as string;
      }
      if (token.email) {
        session.user.email = token.email as string;
      }
      if (token.name) {
        session.user.name = token.name as string;
      }
      if (token.picture) {
        session.user.image = token.picture as string;
      }
      
      return session
    },
  },
})
