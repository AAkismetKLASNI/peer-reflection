import { AvatarSkeleton } from '../avatar/avatar.skeleton';

export function ProfileSkeleton() {
  return (
    <div className='bg-opacity p-2 flex gap-2 items-center rounded-xl h-14'>
      <AvatarSkeleton size='small' />
      <div className='w-16 h-4 rounded-xl bg-white/25  animate-pulse'></div>
    </div>
  );
}
