// types
import { PanelId } from "providers/ActionPanel";

export type ToolbarActionProps = {
  id: PanelId;
  name: string;
  tooltip: string;
  aria: string;
  image: string;
};
