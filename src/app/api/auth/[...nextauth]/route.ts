import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers:
  [
    CredentialsProvider({
      name: "Credentials",

      credentials:
      {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials)
      {
        //console.log(credentials);
        
        const user = await prisma.user.findUnique({where: {email: credentials?.email}});
        if(!user)
        {
          return null;
        }

        //console.log(user);
        const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password);
  
        if(!isPasswordValid)
        {
          return null;
        }

        //console.log(user);

        return {...user};
      }
    })
  ],

  callbacks:
  {
    async jwt({ token, user })
    {
      // `user` existe uniquement à la première connexion
      if (user)
      {
          token.id = user.id;
          token.role = (user as any).role;
      }
      return token;
    },
    
    async session({ session, token })
    {
      // On injecte les infos dans la session côté client
      if (token)
      {
          session.user.id = token.id;
          session.user.role = token.role;
      }
      return session;
    }
  },

  session:
  {
    strategy: "jwt",
  },

  pages:
  {
    signIn: "/login", // ta page personnalisée
  }
})

export { handler as GET, handler as POST };
