import Tippy from "@tippyjs/react";

// providers
import { useActionPanel } from "providers/ActionPanel";

// types
import { ToolbarActionProps } from "./types";

/**
 * ToolbarAction
 * @param props - Props
 * @returns ToolbarAction component
 */
const ToolbarAction = (props: ToolbarActionProps) => {
  const { image, tooltip, name, aria, id } = props;

  const { setShowPanel } = useActionPanel();

  return (
    <Tippy content={tooltip}>
      <button
        id={id}
        type="button"
        onClick={() => setShowPanel(id)}
        aria-label={aria}
        className="flex flex-col items-center justify-center"
      >
        <img className="w-8 h-8 rounded-lg object-cover" src={image} alt={name} />
      </button>
    </Tippy>
  );
};

export default ToolbarAction;
