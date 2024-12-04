import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';
import './globals.css';
import SidebarRooms from '@/components/layouts/sidebar.rooms/sidebar.rooms';

const geologica = Geologica({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reflection - PeerChat for you and your friends',
  description: 'Reflection - PeerChat for you and your friends',
  icons: '/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='h-full' lang='en'>
      <body className={`${geologica.className} h-full antialiased flex`}>
        <SidebarRooms />
        {children}
      </body>
    </html>
  );
}
