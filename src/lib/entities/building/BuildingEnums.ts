/**
 * Mirrors the server's building enums
 * (`src/modules/building/entities/building.entity.ts` and `building-queue.entity.ts`).
 */
export enum BuildingState {
  Constructing = 0,
  Working = 1,
  Demolished = 2,
  Inactive = 3,
}

export enum BuildingQueueActions {
  Building = 0,
  Upgrading = 1,
  Downgrading = 2,
  Demolishing = 3,
}

export enum BuildingQueueState {
  Enqueued = 0,
  Started = 1,
  Cancelled = 2,
  Completed = 3,
  Failed = 4,
}
