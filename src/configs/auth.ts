import type { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserCredentials {
  name: string;
  password: string;
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "Local name" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: UserCredentials | undefined) => {
        if (!credentials || !credentials.name || !credentials.password) {
          return null;
        }

        try {
          const response = await fetch("http://localhost:5000/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const user = await response.json();
            
            return user === false ? null: credentials as unknown as User;
          } else {
            console.error("Server error", response.status);
            return null;
          }
        } catch (error) {
          console.error("An error occurred", error);
          return null;
        }
      },
    }),
  ],
};
