'use client';

import './globals.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CartProvider } from '@/app/lib/CartContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideNavbarOn = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
  ];

  const hiddenRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
    '/app/home',
  ];


  const shouldHideFooter = hiddenRoutes.includes(pathname);
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="en">
      <body>
        <CartProvider>
          {!shouldHideNavbar && <Navbar />}
          <main className="pt-0">{children}</main>
          {!shouldHideFooter && <Footer />}
          </CartProvider>
      </body>
    </html>
  );
}
