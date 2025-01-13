import { PagesConfig } from '@/configs/pages';
import { MAX_COUNT_CLIENTS } from '@/constants';
import { IRoom } from '@/types/room';
import { useRouter } from 'next/navigation';

type Props = IRoom;

export function Room({ id, name, count }: Props) {
  const router = useRouter();

  const pagesConfig = new PagesConfig();

  const joinRoom = async () => {
    if (count === MAX_COUNT_CLIENTS) {
      const { toast } = await import('react-toastify');
      toast.error('The room is crowded');
      return;
    }

    router.push(pagesConfig.getRoom(id));
  };

  return (
    <div
      className='p-2 bg-opacity flex justify-between items-center cursor-pointer w-full rounded-xl'
      onClick={joinRoom}
    >
      <span>{name}</span>
      <span className='bg-opacity px-2 py-1 rounded-xl text-xs'>
        {count}/{MAX_COUNT_CLIENTS}
      </span>
    </div>
  );
}
