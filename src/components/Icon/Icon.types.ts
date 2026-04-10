import type { SVGProps } from "react";
import type * as Icons from "@/assets/svgs";

export type KeyOfIcon = keyof typeof Icons;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: KeyOfIcon;
  size?: number;
  onClick?: () => void;
}
