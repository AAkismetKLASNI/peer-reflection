import Image from 'next/image';

export default function Home() {
  return (
    <main className='p-4 w-full flex justify-center items-center'>
      <Image
        className=''
        src='/images/banner.svg'
        alt='banner'
        width='450'
        height='0'
      />
    </main>
  );
}
