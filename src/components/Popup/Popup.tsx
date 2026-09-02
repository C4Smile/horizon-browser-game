import { useCallback, useEffect, useState } from "react";

// types
import { PopupProps } from "./types";

/**
 * Popup component
 * @param props - properties for the popup
 * @returns Popup component
 */
function Popup(props: PopupProps) {
  const { children, className, show, onClose } = props;

  const [realDisplay, setRealDisplay] = useState(false);

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    },
    [onClose],
  );

  useEffect(() => {
    if (show) window.addEventListener("keydown", onKeyPress);
    else window.removeEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress, show]);

  useEffect(() => {
    if (show) setRealDisplay(true);
    else setTimeout(() => setRealDisplay(false));
  }, [show]);

  return (
    <div
      className={`${realDisplay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} transition duration-300 ease-in-out absolute p-4 rounded-lg bg-white shadow-lg ${className}`}
    >
      {realDisplay ? children : null}
    </div>
  );
}

export default Popup;
