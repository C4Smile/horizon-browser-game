// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameBuildingTypeDto } from "lib";

/**
 * @class BuildingTypeApiClient
 * @description BuildingTypeApiClient
 */
export class BuildingTypeApiClient extends BaseApiClient<GameBuildingTypeDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "buildingTypes";
  }
}
