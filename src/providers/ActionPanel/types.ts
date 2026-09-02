import { ReactNode } from "react";

/** Panels the game toolbar can open. */
export type PanelId = "buildings" | "ships" | "techs" | "guns";

export type ActionPanelProviderProps = {
  children: ReactNode;
};

export type ActionPanelContextType = {
  showPanel: PanelId | null;
  setShowPanel: (panel: PanelId | null) => void;
  closePanel: () => void;
};
