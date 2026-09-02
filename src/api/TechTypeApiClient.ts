// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameTechTypeDto } from "lib";

/**
 * @class TechTypeApiClient
 * @description TechTypeApiClient
 */
export class TechTypeApiClient extends BaseApiClient<GameTechTypeDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "techTypes";
  }
}
