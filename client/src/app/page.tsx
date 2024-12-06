import Image from 'next/image';

export default function Home() {
  return (
    <main className='p-2 w-full flex justify-center items-center'>
      <Image
        className='select-none'
        src='/banner.svg'
        alt='banner'
        width='400'
        height='0'
      />
    </main>
  );
}
