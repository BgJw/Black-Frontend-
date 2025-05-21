import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      if (pathname === "/sign-in") return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
