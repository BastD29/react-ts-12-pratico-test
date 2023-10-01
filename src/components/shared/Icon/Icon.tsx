// Static

import iconSet from "../../../assets/selection.json";

// Components
import IcomoonReact from "icomoon-react";

// Types
import type { FC } from "react";
import THEME from "../../../constants/theme";
// --- END OF IMPORTS ----------------------------------------------------------------
const COLORS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
] as const;

export interface IconProps {
  icon: string;
  color?: (typeof COLORS)[number] | string;
  size?: string | number;
  className?: string;
  onClick?: (event: any) => void;
}

function getColor(color: IconProps["color"]) {
  if (!color) return THEME.colors.get("primary");

  return THEME.colors.get(color) || color;
}

const Icon: FC<IconProps> = ({
  color = "primary",
  size = "1.5rem",
  icon,
  className,
  onClick,
}) => {
  const iconColor = getColor(color);

  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={iconColor}
      size={size}
      icon={icon}
      onClick={onClick}
    />
  );
};

export { Icon };
