// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameShipDto } from "lib";

/**
 * @class ShipApiClient
 * @description ShipApiClient
 */
export class ShipApiClient extends BaseApiClient<GameShipDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "ships";
  }
}
