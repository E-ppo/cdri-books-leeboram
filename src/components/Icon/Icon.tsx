import type { JSX } from 'react';
import * as Icons from '@/assets/svgs';
import type { IconProps } from './Icon.types';

const Icon = ({
  name,
  width: _width,
  height: _height,
  size,
  onClick,
  ...props
}: IconProps): JSX.Element => {
  const IconComponent = Icons[name as keyof typeof Icons];
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <IconComponent {...props} {...sizeProps} />
    </span>
  );
};

export default Icon;
