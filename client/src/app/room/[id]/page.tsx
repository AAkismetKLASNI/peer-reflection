'use client';

import useWebRtc from '@/hooks/use.web.rtc';
import { useParams } from 'next/navigation';

export default function Room() {
  const { id }: { id: string } = useParams();
  useWebRtc(id);

  return <div>room - {id}</div>;
}
