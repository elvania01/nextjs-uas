'use client';

import './globals.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import { CartProvider } from '@/app/lib/CartContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideNavbarOn = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
  ];

  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="en">
      <body>
        <CartProvider>
          {!shouldHideNavbar && <Navbar />}
          <main className="pt-0">{children}</main>
          </CartProvider>
      </body>
    </html>
  );
}
