import { createContext, useCallback, useContext, useMemo, useState } from "react";

// types
import { ActionPanelContextType, ActionPanelProviderProps, PanelId } from "./types";

const ActionPanelContext = createContext<ActionPanelContextType | undefined>(undefined);

/**
 * ActionPanelProvider
 * @param props - Props
 * @returns React component
 */
const ActionPanelProvider = (props: ActionPanelProviderProps) => {
  const { children } = props;

  const [showPanel, setShowPanel] = useState<PanelId | null>(null);

  const closePanel = useCallback(() => setShowPanel(null), []);

  const value = useMemo(() => ({ showPanel, setShowPanel, closePanel }), [showPanel, closePanel]);

  return <ActionPanelContext.Provider value={value}>{children}</ActionPanelContext.Provider>;
};

/**
 * useActionPanel hook
 * @returns the panel state
 */
const useActionPanel = (): ActionPanelContextType => {
  const context = useContext(ActionPanelContext);
  if (context === undefined) throw new Error("useActionPanel must be used within a ActionPanel");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ActionPanelProvider, useActionPanel };
