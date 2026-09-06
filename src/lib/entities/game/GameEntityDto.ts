/**
 * Types mirroring the server's game DTOs
 * (horizon-sever `src/modules/game/dto/**`, branch alpha-game/0.0.1).
 */

export type GameResourceDto = {
  id: number;
  name: string;
  image: string;
  baseFactor: number;
  description: string;
};

export type GameBuildingDto = {
  id: number;
  name: string;
  image: string;
  creationTime: number;
  description: string;
  typeId: number;
};

/** A type is only a name here: the tab that shows it renders text. */
export type GameBuildingTypeDto = {
  id: number;
  name: string;
};

export type GameCannonDto = {
  id: number;
  name: string;
  creationTime: number;
  description: string;
  weight: number;
  baseDamage: number;
};

export type GameShipDto = {
  id: number;
  name: string;
  image: string;
  capacity: number;
  knots: number;
  minCrew: number;
  bestCrew: number;
  maxCrew: number;
  guns: number;
  hull: number;
  creationTime: number;
  description: string;
};

export type GameTechDto = {
  id: number;
  name: string;
  image: string;
  typeId: number;
  description: string;
  creationTime: number;
};

/** A type is only a name here: nothing in the game draws a picture for one. */
export type GameTechTypeDto = {
  id: number;
  name: string;
};

export type GameResourceRelationshipDto = {
  id: number;
  entityId: number;
  resourceId: number;
  factor: number;
  base: number;
};

export type GameEntityReqBuildingDto = {
  id: number;
  entityId: number;
  buildingReqId: number;
  level: number;
};

export type GameEntityReqTechDto = {
  id: number;
  entityId: number;
  techReqId: number;
  level: number;
};
