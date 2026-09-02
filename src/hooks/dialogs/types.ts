import { FormEvent } from "react";
import { Control, FieldValues } from "react-hook-form";

// components
import { DialogControlProps } from "components/Dialogs";

export type UseFormDialogProps<TValues extends FieldValues> = {
  initial?: TValues;
  submit: (values: TValues) => void;
};

export type UseFormDialogResult<TValues extends FieldValues> = {
  dialogProps: DialogControlProps;
  control: Control<TValues>;
  onSubmit: (event: FormEvent) => void;
};
