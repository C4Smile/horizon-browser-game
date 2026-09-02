import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// types
import { BuildingQueueActions, GameBuildingDto } from "lib";
import { ActionProps } from "components/PanelCard";

export type UseEnqueueActionProps = {
  userId?: number;
  buildingAction: BuildingQueueActions;
  icon: IconDefinition;
  aria: string;
  tooltip: string;
};

export type UseEnqueueActionResult = {
  action: (row: GameBuildingDto, hidden?: boolean) => ActionProps;
};
