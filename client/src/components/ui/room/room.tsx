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
      className='p-2 bg-transparent inline-block cursor-pointer w-full rounded-lg hover:opacity-60'
      onClick={() => router.push(`/room/${roomId}`)}
    >
      ROOM - {roomId.slice(0, 5)}
    </div>
  );
}
