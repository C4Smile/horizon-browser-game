// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { ModelDto } from "lib";

export interface HorizonRoleDto extends ModelDto {
  name: string;
}

/**
 * @class RoleApiClient
 * @description RoleApiClient
 */
export class RoleApiClient extends BaseApiClient<HorizonRoleDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "horizonRole";
  }
}
