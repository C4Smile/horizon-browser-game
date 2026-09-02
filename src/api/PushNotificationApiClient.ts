// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { ModelDto, PhotoDto } from "lib";

export interface PushNotificationDto extends ModelDto {
  title: string;
  description: string;
  image?: PhotoDto;
}

/**
 * @class PushNotificationApiClient
 * @description PushNotificationApiClient
 */
export class PushNotificationApiClient extends BaseApiClient<PushNotificationDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "pushNotification";
  }
}
