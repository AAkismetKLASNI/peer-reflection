import { AVATAR_SIZE } from './avatar.size';

interface Props {
  size: keyof typeof AVATAR_SIZE;
}

export function AvatarSkeleton({ size }: Props) {
  return (
    <div
      className={`${AVATAR_SIZE[size]} bg-white/20 rounded-full flex justify-center items-center text-2xl animate-pulse`}
    />
  );
}
