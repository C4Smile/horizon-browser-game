// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameCannonDto } from "lib";

/**
 * @class CannonApiClient
 * @description CannonApiClient
 */
export class CannonApiClient extends BaseApiClient<GameCannonDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "cannons";
  }
}
