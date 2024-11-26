import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';
import './globals.css';

const geologica = Geologica({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reflection - PeerChat for you and your friends',
  description: 'Reflection - PeerChat for you and your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geologica.className} antialiased`}>{children}</body>
    </html>
  );
}
