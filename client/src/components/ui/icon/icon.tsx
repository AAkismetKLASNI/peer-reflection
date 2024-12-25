import * as Icons from 'lucide-react';
import { ICON_PADDING } from './icon.padding';
import { useState } from 'react';

interface Props {
  name: keyof typeof Icons;
  enabledName?: keyof typeof Icons;
  enabled?: boolean;
  onClick?: () => void;
  padding?: keyof typeof ICON_PADDING;
  size?: string;
  tooltip?: string;
}

export function Icon({
  name,
  enabled = true,
  enabledName,
  onClick,
  padding = 'medium',
  size,
  tooltip,
}: Props) {
  const IconComponent = enabled ? Icons[name] : Icons[enabledName];

  const [isTooltipShow, setIsToolTipShow] = useState(false);

  return (
    <>
      <div className='relative flex justify- items-center'>
        <div
          className={`cursor-pointer ${ICON_PADDING[padding]} rounded-full hover-backdrop-theme`}
          onClick={onClick}
          onMouseEnter={() => setIsToolTipShow(true)}
          onMouseLeave={() => setIsToolTipShow(false)}
        >
          {' '}
          <IconComponent size={size} />
        </div>

        {tooltip && isTooltipShow && (
          <span className='absolute left-10 backdrop-theme p-2 rounded-full text-xs '>
            {tooltip}
          </span>
        )}
      </div>
    </>
  );
}
