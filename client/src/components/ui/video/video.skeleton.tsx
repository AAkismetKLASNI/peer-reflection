import { AvatarSkeleton } from '../avatar/avatar.skeleton';

export function VideoSkeleton() {
  return (
    <div className='bg-opacity relative w-full h-full rounded-xl flex justify-center items-center'>
      <AvatarSkeleton size='medium' />
    </div>
  );
}
