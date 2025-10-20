import NextAuth, { DefaultSession, Session, User } from 'next-auth';
import { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;


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
          const response = await fetch(`${API_URL}/auth/login`, {
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

async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<string>
{
    if (url.startsWith(baseUrl + '/sign-in')) {
      return baseUrl;
    }
    if (url.startsWith(baseUrl)) {
      return url;
    }
    return baseUrl;
  },
}
,
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET || 'supersecret',
};

export default NextAuth(authConfig);
