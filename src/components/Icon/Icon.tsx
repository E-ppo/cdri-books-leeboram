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

  const ariaLabel = props['aria-label'];
  const hasLabel = typeof ariaLabel === 'string' && ariaLabel.length > 0;
  const ariaHidden = props['aria-hidden'] ?? (hasLabel ? undefined : true);
  const role = props.role ?? (hasLabel ? 'img' : undefined);

  return (
    <span
      onClick={onClick}
      aria-hidden={ariaHidden}
      style={{
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <IconComponent {...props} {...sizeProps} aria-hidden={ariaHidden} role={role} />
    </span>
  );
};

export default Icon;
