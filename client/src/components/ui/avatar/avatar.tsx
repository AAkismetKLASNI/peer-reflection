import Image from 'next/image';
import { AVATAR_SIZE } from './avatar.size';

interface Props {
  avatar: string;
  name: string;
  size: keyof typeof AVATAR_SIZE;
}

export function Avatar({ avatar, name, size }: Props) {
  return (
    <>
      {avatar ? (
        <Image
          className='rounded-full aspect-square'
          src={avatar}
          blurDataURL={avatar}
          placeholder='blur'
          width={size === 'small' ? '40' : '80'}
          height={size === 'small' ? '40' : '80'}
          alt='avatar'
        />
      ) : (
        <div
          className={`${AVATAR_SIZE[size]} bg-white/5 rounded-full flex justify-center items-center text-2xl hover:rounded-xl transition-transform`}
        >
          {name[0]}
        </div>
      )}
    </>
  );
}
