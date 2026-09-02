// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { ModelDto } from "lib";

export interface SkillDto extends ModelDto {
  name: string;
  description: string;
}

/**
 * @class SkillApiClient
 * @description SkillApiClient
 */
export class SkillApiClient extends BaseApiClient<SkillDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "skills";
  }
}
