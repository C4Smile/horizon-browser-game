// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameTechDto } from "lib";

/**
 * @class TechApiClient
 * @description TechApiClient
 */
export class TechApiClient extends BaseApiClient<GameTechDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "techs";
  }
}
