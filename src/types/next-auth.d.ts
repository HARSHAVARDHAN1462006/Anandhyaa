import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id:    string;
      name:  string;
      email?: string;
      phone: string;
      role:  string;
    };
  }

  interface User {
    id:    string;
    phone: string;
    role:  string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id:    string;
    phone: string;
    role:  string;
  }
}
