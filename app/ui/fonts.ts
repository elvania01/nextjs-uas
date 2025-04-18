import { Lusitana, Pacifico } from 'next/font/google';

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lusitana',
});

export const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
  weight: '400',
});