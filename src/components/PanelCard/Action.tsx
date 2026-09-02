import Tippy from "@tippyjs/react";

// types
import { ActionProps } from "./types";

/**
 * Action
 * @param props - Props
 * @returns Action component
 */
function Action(props: ActionProps) {
  const { id, onClick, icon, tooltip, aria } = props;

  return (
    <Tippy content={tooltip}>
      <button onClick={onClick} id={String(id)} aria-label={aria} name={tooltip}>
        {icon}
      </button>
    </Tippy>
  );
}

export default Action;
