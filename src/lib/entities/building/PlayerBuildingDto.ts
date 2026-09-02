import { BuildingQueueActions, BuildingQueueState, BuildingState } from "./BuildingEnums";

/**
 * A row of the player's `buildings` table, as returned by `GET buildings/player/:id`.
 */
export interface PlayerBuildingDto {
  id: number;
  buildingId: number;
  playerId: number;
  level: number;
  state: BuildingState;
}

/**
 * A row of `building-queues`, as returned by `GET buildings/queue/player/:id`.
 */
export interface BuildingQueueDto {
  id: number;
  buildingId: number;
  building: PlayerBuildingDto;
  playerId: number;
  action: BuildingQueueActions;
  startedAt: string;
  endsAt: string;
  state: BuildingQueueState;
}

/**
 * Body of `POST buildings/enqueue`.
 */
export interface EnqueueDto {
  playerId: number;
  buildingId: number;
  action: BuildingQueueActions;
}
