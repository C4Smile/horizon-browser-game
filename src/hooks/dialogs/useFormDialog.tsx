import { useCallback, useState, useEffect } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

// types
import { UseFormDialogProps, UseFormDialogResult } from "./types";

/**
 * @param props hook props
 * @returns hook to control form
 */
export const useFormDialog = <TValues extends FieldValues>(
  props: UseFormDialogProps<TValues>,
): UseFormDialogResult<TValues> => {
  const { initial, submit } = props;

  const { control, reset, getValues } = useForm<TValues>();

  const [showDialog, setShowDialog] = useState(false);

  const open = useCallback(() => setShowDialog(true), []);
  const onClose = useCallback(() => setShowDialog(false), []);

  useEffect(() => {
    if (initial) reset({ ...initial } as DefaultValues<TValues>);
    else reset();
  }, [initial, reset]);

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      submit(getValues());
      onClose();
    },
    [getValues, onClose, submit],
  );

  return {
    dialogProps: {
      show: showDialog,
      open,
      onClose,
    },
    control,
    onSubmit,
  };
};
