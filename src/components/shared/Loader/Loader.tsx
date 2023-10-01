import { Ring } from "@uiball/loaders";

import { createPortal } from "react-dom";

import styles from "./Loader.module.scss";
import THEME from "../../../constants/theme";

export type LoaderProps = Partial<{
  color: string;
  size: number;
  speed: number;
}>;

export type LoaderFullWidthProps = LoaderProps & {
  isFloating?: boolean | undefined;
};

const DEFAULT_COLOR = THEME.colors.get("primary-400");
const DEFAULT_SIZE = 48;
const DEFAULT_SPEED = 1.5;

const Loader = ({
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
  speed = DEFAULT_SPEED,
}: LoaderProps) => <Ring size={size} speed={speed} color={color} />;

const LoaderFullWidth = ({
  isFloating = false,
  ...loaderProps
}: LoaderFullWidthProps) => {
  const _LoaderFullWidth = (
    <div className={styles["loader-full-width"]}>
      <Loader {...loaderProps} />
    </div>
  );

  return isFloating
    ? createPortal(_LoaderFullWidth, document.body)
    : _LoaderFullWidth;
};

Loader.FullWidth = LoaderFullWidth;
export { Loader };
