import NextAuth, { DefaultSession, Session, User } from 'next-auth';
import { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';



declare module 'next-auth' {
    interface Session {
      accessToken?: string;
      user?: {
        id: string;
        username: string;
      } & DefaultSession['user'];
    }
  
    interface User extends DefaultUser {
      token?: string;
      username: string;
    }
  
    interface JWT {
      accessToken?: string;
      username: string;
    }
  }
  

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Username', type: 'text', placeholder: 'Local name' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.name || !credentials.password) {
          return null;
        }

        try {
          const response = await fetch('https://black.adaptable.app/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.name,
              password: credentials.password,
            }),
          });
          
          if (response.ok) {
            const user = await response.json();
            
            if (user && user.token) {
                
                return {
                    ...user,
                    username: user.username
                  };
              }
          } else {
            console.error('Server error', response.status);
            return null;
          }
        } catch (error) {
          console.error('An error occurred', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
        
      if (user) {
        token.accessToken = user.token;
        token.name = user.username;
      }
      
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.accessToken = token.accessToken as string;      
      return session;
  },
  },
  pages: {
    signIn: '/signIn',
    signOut: '/signIn',
  },
  secret: 'supersecret',
};

export default NextAuth(authConfig);
