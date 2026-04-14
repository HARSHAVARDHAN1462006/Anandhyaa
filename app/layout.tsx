import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SessionProvider from '@/components/providers/SessionProvider';
import CartProvider from '@/components/providers/CartProvider';
import CartDrawer from '@/components/shop/CartDrawer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Anandhyaa — Pure A2 Dairy Products',
  description:
    'Farm-fresh A2 milk, ghee, paneer, curd and lassi delivered to your door. 100% pure Gir cow A2 dairy from Anandhyaa.',
  keywords: 'A2 milk, A2 ghee, pure dairy, Gir cow milk, Anandhyaa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: '#1D9E75',
                color: '#fff',
                fontWeight: '500',
              },
            },
            error: {
              style: {
                background: '#D85A30',
                color: '#fff',
                fontWeight: '500',
              },
            },
          }}
        />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}