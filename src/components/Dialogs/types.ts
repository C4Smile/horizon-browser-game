import { FormEvent, ReactNode } from "react";

export type DialogProps = {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
};

export type DialogControlProps = {
  show: boolean;
  open: () => void;
  onClose: () => void;
};

export type FormDialogProps = {
  dialogProps: DialogControlProps;
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
};
