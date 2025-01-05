'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  roomId: string;
}

export function Room({ roomId }: Props) {
  const router = useRouter();

  return (
    <div
      className='p-2 text-center backdrop-theme inline-block cursor-pointer w-full rounded-xl'
      onClick={() => router.push(`/room/${roomId}`)}
    >
      room - {roomId.slice(0, 2)}
    </div>
  );
}
