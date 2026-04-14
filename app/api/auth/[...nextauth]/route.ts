import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Phone OTP',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        otp:   { label: 'OTP',   type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;

        // Get OTP from Redis and verify
        const { redis } = await import('@/lib/redis');
        const storedOtp = await redis.get(`otp:${credentials.phone}`);

        if (storedOtp !== credentials.otp) return null;

        // Delete OTP after use
        await redis.del(`otp:${credentials.phone}`);

        // Find or create user
        const user = await prisma.user.upsert({
          where:  { phone: credentials.phone },
          update: {},
          create: { phone: credentials.phone, name: '' },
        });

        return {
          id:    user.id,
          phone: user.phone,
          name:  user.name ?? '',
          role:  user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id    = user.id;
        token.phone = (user as any).phone;
        token.role  = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id    = token.id as string;
        session.user.phone = token.phone as string;
        session.user.role  = token.role  as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge:   30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
