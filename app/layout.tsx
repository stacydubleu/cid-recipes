import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Search from '@/components/search';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CID Recipes',
  description: 'A collection of recipes from the CID community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='flex flex-row align-left px-8 sm:px-16 md:px-32 py-8 sm:py-16 gap-8 '>
          <Link href='/' className='mt-auto'>
            <b>
              <h1 className='basis-1/6 mt-auto'>CID Recipes</h1>
            </b>
          </Link>
          <div className='basis-5/6'>
            <Search />
          </div>
        </header>
        <div className='px-8 sm:px-16 md:px-32 pt-8'>{children}</div>
      </body>
    </html>
  );
}
