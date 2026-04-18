import { ClerkProvider } from '@clerk/nextjs';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'Mesa',
  description: 'College and people, matched.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
