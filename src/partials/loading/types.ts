import { HTMLAttributes } from "react";

export type LoadingProps = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  loaderClass?: string;
  strokeWidth?: string;
};

export type SplashScreenProps = {
  visible: boolean;
};
