import * as Icons from 'lucide-react';
import { ICON_PADDING } from './icon.padding';
import { ICON_ROUNDED } from './icon.rounded';
import { ICON_COLOR } from './icon.color';
import { useState } from 'react';
import { ICON_BG } from './icon.bg';

interface Props {
  name: keyof typeof Icons;
  enabledName?: keyof typeof Icons;
  enabled?: boolean;
  onClick?: () => void;
  padding?: keyof typeof ICON_PADDING;
  rounded?: keyof typeof ICON_ROUNDED;
  color?: keyof typeof ICON_COLOR;
  bg?: keyof typeof ICON_BG;
  size?: string;
  tooltip?: string;
}

export function Icon({
  name,
  enabled = true,
  enabledName,
  onClick,
  padding = 'medium',
  rounded = 'xl',
  color = 'white',
  bg = 'default',
  size,
  tooltip,
}: Props) {
  const IconComponent = enabled ? Icons[name] : Icons[enabledName];

  const [isTooltipShow, setIsToolTipShow] = useState(false);

  return (
    <>
      <div className='relative inline-block'>
        <div
          className={`cursor-pointer ${ICON_PADDING[padding]} ${ICON_ROUNDED[rounded]} ${ICON_BG[bg]}`}
          onClick={onClick}
          {...(tooltip && {
            onMouseEnter: () => setIsToolTipShow(true),
            onMouseLeave: () => setIsToolTipShow(false),
          })}
        >
          <IconComponent size={size} color={ICON_COLOR[color]} />
        </div>
        {isTooltipShow && (
          <span className='absolute bottom-10 bg-opacity p-2 rounded-xl text-xs text-nowrap'>
            {tooltip}
          </span>
        )}
      </div>
    </>
  );
}
