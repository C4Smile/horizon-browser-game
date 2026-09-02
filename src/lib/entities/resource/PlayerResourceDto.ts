/**
 * A row of the player's `resources` table, as returned by `GET resources/player/:id`.
 */
export interface PlayerResourceDto {
  id: number;
  resourceId: number;
  playerId: number;
  inStock: number;
  maxCapacity: number;
  currentFactor: number;
}

/**
 * Mirrors the server's `NotResourcesDto`, pushed through the `not.resources` socket event.
 */
export interface NotResourcesDto {
  collection: string;
  entityId: number;
  playerId: number;
}

/** Well known resource ids. */
export enum ResourcesEnum {
  Materials = 1,
  Supplies = 2,
  Coins = 3,
  People = 4,
}
