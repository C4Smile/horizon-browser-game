import { MouseEventHandler, ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";

// types
import {
  BuildingQueueDto,
  GameCollection,
  GameResourceDto,
  GameResourceRelationshipDto,
  HttpFailure,
} from "lib";

export type PanelProps = {
  children: ReactNode;
  id?: string;
};

export type ActionProps = {
  id: number | string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
  tooltip: string;
  aria: string;
  hidden?: boolean;
};

/** A cost row already linked with the resource it spends. */
export type LinkedCostDto = GameResourceRelationshipDto & {
  resource: GameResourceDto;
};

export type CostProps = LinkedCostDto & {
  /** Level the entity currently sits at, drives the cost multiplier. */
  level?: number;
};

export type PanelCardProps = {
  id: number | string;
  name: string;
  description: string;
  image: string;
  actions?: ActionProps[];
  costs?: LinkedCostDto[];
  /** Already translated label, e.g. `State: Working`. */
  state?: string;
  /** Already translated label, e.g. `Level 3`. */
  level?: string;
  realLevel?: number;
};

export type QueueProps = {
  playerQueue: UseQueryResult<BuildingQueueDto[] | HttpFailure>;
  collection: GameCollection;
  entity: "building";
};

export type QueueRowProps = {
  queue: BuildingQueueDto;
  collection: GameCollection;
  entity: "building";
  active: boolean;
};
