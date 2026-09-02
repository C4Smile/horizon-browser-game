import {
  GameBuildingDto,
  GameBuildingTypeDto,
  GameCannonDto,
  GameEntityReqBuildingDto,
  GameEntityReqTechDto,
  GameResourceDto,
  GameResourceRelationshipDto,
  GameShipDto,
  GameTechDto,
  GameTechTypeDto,
} from "./GameEntityDto";

/**
 * Mirrors the server's `GameBasicsDto` returned by `GET game/:userId`.
 */
export type GameBasicsDto = {
  resources: GameResourceDto[];
  buildings: GameBuildingDto[];
  buildingTypes: GameBuildingTypeDto[];
  buildingCosts: GameResourceRelationshipDto[];
  buildingUpkeeps: GameResourceRelationshipDto[];
  buildingProduces: GameResourceRelationshipDto[];
  buildingReqBuildings: GameEntityReqBuildingDto[];
  buildingReqTechs: GameEntityReqTechDto[];
  cannons: GameCannonDto[];
  cannonCosts: GameResourceRelationshipDto[];
  cannonReqBuildings: GameEntityReqBuildingDto[];
  cannonReqTech: GameEntityReqTechDto[];
  ships: GameShipDto[];
  shipCosts: GameResourceRelationshipDto[];
  shipUpkeeps: GameResourceRelationshipDto[];
  shipReqBuildings: GameEntityReqBuildingDto[];
  shipReqTechs: GameEntityReqTechDto[];
  techs: GameTechDto[];
  techTypes: GameTechTypeDto[];
  techCosts: GameResourceRelationshipDto[];
  techProduces: GameResourceRelationshipDto[];
  techReqBuildings: GameEntityReqBuildingDto[];
  techReqTechs: GameEntityReqTechDto[];
};

/**
 * Collections of `GameBasicsDto` a queue row can point at.
 */
export type GameCollection = Extract<keyof GameBasicsDto, "buildings" | "ships" | "techs" | "cannons">;
