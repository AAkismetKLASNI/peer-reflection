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
  enabled = true,
  enabledName,
  onClick,
  fill = 'neutral',
}: Props) {
  const IconComponent = enabled ? Icons[name] : Icons[enabledName];

  return (
    <div
      className={`p-4 cursor-pointer rounded-full ${ICON_FILL[fill]}`}
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
}
