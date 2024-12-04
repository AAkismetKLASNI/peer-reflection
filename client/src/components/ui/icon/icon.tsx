import * as Icons from 'lucide-react';
import { ICON_FILL } from './icon.fill';

interface Props {
  name: keyof typeof Icons;
  enabledName?: keyof typeof Icons;
  enabled?: boolean;
  onClick: () => void;
  fill?: keyof typeof ICON_FILL;
}

export function Icon({
  name,
  enabled,
  enabledName,
  onClick,
  fill = 'neutral',
}: Props) {
  const IconComponent = enabled ? Icons[enabledName] : Icons[name];

  return (
    <div
      className={`p-4 cursor-pointer rounded-full hover:bg-neutral-900`}
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
}
