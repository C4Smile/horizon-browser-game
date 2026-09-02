import { useCallback, useEffect, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// components
import { Dialog } from "components/Dialogs";

// providers
import { useActionPanel } from "providers/ActionPanel";

// types
import { PanelProps } from "./types";

/**
 * Panel
 * @param props - Props
 * @returns Panel component
 */
function Panel(props: PanelProps) {
  const { children, id } = props;

  const { showPanel, setShowPanel } = useActionPanel();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (showPanel) setOpenDialog(true);
  }, [showPanel]);

  const onClose = useCallback(() => {
    setOpenDialog(false);
    setTimeout(() => {
      setShowPanel(null);
    }, 400);
  }, [setShowPanel]);

  return (
    <Dialog show={openDialog} onClose={onClose} hideCloseButton>
      <section
        id={`${id}-panel`}
        className="relative p-4 rounded-lg bg-ocean min-w-[350px] max-w-[600px] min-h-[400px] max-h-[95vh] overflow-auto"
      >
        <button
          type="button"
          className="right-3 top-3 absolute text-xl text-light-primary hover:text-error"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {children}
      </section>
    </Dialog>
  );
}

export default Panel;
