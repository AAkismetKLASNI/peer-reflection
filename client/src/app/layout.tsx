import './globals.css';
import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';
import { SidebarRooms } from '@/components/layouts/sidebar.rooms/sidebar.rooms';
import { SidebarSettings } from '@/components/layouts/sidebar.settings/sidebar.settings';
import { ToastContainer } from 'react-toastify';

const geologica = Geologica({ subsets: ['latin'], weight: '400' });

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
    <html className={`${geologica.className} antialiased h-full`} lang='en'>
      <body>
        <SidebarRooms />
        {children}
        <SidebarSettings />
        <ToastContainer theme='dark' position='bottom-right' />
      </body>
    </html>
  );
}
