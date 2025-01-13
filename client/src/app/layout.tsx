import './globals.css';
import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';
import { SidebarRooms } from '@/components/layouts/sidebar.rooms/sidebar.rooms';
import { ToastContainer } from 'react-toastify';
import { SidebarPallete } from '@/components/layouts/sidebar.pallete/sidebar.pallete';

const geologica = Geologica({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Reflection - PeerChat for you and your friends',
  description: 'Reflection - PeerChat for you and your friends',
  icons: '/images/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geologica.className} antialiased h-full`} lang='en'>
      <body>
        <SidebarRooms />
        {children}
        <SidebarPallete />
        <ToastContainer theme='dark' position='bottom-right' />
      </body>
    </html>
  );
}
