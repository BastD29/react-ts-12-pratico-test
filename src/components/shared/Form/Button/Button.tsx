// Styles
import styles from "./Button.module.scss";

// Types
import type { FC, ReactNode } from "react";
// import { Icon, IconProps } from "../../../../components/shared/Icon/Icon";

type ButtonVariants = "primary" | "outline-primary" | "block" | "text";

// Utils
// import Loader from '../loader/Loader'
// import THEME from '@/constants/theme'

import { Loader } from "../../Loader/Loader";
import { HTMLButtonProps } from "../../../../models/html.model";
import classname from "../../../../utils/classname";
import { Icon, IconProps } from "../../Icon/Icon";

interface ButtonIcon {
  name: string;
  position?: "left" | "right";
  color?: IconProps["color"];
  size?: number;
}
export interface ButtonProps extends HTMLButtonProps {
  text: string | ReactNode;
  variant?: ButtonVariants;
  className?: string;
  block?: boolean;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  containerClassName?: string;
  icon?: ButtonIcon;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  variant = "primary",
  block = false,
  className,
  disabled,
  bgColor = "primary",
  borderColor = "secondary",
  textColor,
  containerClassName,
  icon,
  isLoading = false,
  ...props
}) => {
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <Icon
        size={icon.size}
        icon={icon.name}
        color={icon.color}
        className={styles["btn__icon"]}
      />
    );
  };

  return (
    <button
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
      }}
      {...props}
      className={classname([
        styles.btn,
        containerClassName,
        styles[`btn--${variant}`],
        block && styles["btn--block"],
        disabled && styles["btn--disabled"],
        className,
      ])}
      disabled={disabled}
    >
      {icon?.position === "left" ? renderIcon() : null}
      {isLoading ? (
        <Loader />
      ) : typeof text === "string" ? (
        <span className={styles["btn__text"]}>{text}</span>
      ) : (
        <>
          {typeof text === "string" ? (
            <span className={styles["btn__text"]}>{text}</span>
          ) : (
            text
          )}
        </>
      )}
      {icon?.position === "right" ? renderIcon() : null}
    </button>
  );
};

export { Button };
