import { ReactNode } from "react";

export type PopupProps = {
  children: ReactNode;
  className?: string;
  show: boolean;
  onClose: (show: boolean) => void;
};
