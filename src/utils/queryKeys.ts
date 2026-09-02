export const ReactQueryKeys = {
  Roles: "roles",
  Buildings: "buildings",
  BuildingsQueue: "buildingsQueue",
  Resources: "resources",
  Users: "users",
  Techs: "techs",
  TechCosts: "techCosts",
  TechProduces: "techProduces",
  TechTypes: "techTypes",
  TechRequirements: "techReqTechs",
  Skills: "skills",
  Ships: "ships",
  ShipCosts: "shipCosts",
  ShipUpkeeps: "shipUpkeeps",
  ShipRequirements: "shipRequirements",
  Cannons: "cannons",
  CannonCosts: "cannonCosts",
  CannonRequirements: "cannonRequirements",
  GameData: "gameData",
} as const;

export type ReactQueryKey = (typeof ReactQueryKeys)[keyof typeof ReactQueryKeys];

export const entities = ["building"] as const;

export const Parents = {
  game: "game",
  user: "players",
} as const;
