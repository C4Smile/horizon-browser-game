import { BuildingApiClient } from "./BuildingApiClient";
import { BuildingTypeApiClient } from "./BuildingTypeApiClient";
import { CannonApiClient } from "./CannonApiClient";
import { GameBasicsApiClient } from "./GameBasicsApiClient";
import { ImageApiClient } from "./ImageApiClient";
import { PushNotificationApiClient } from "./PushNotificationApiClient";
import { ResourceApiClient } from "./ResourceApiClient";
import { RoleApiClient } from "./RoleApiClient";
import { ShipApiClient } from "./ShipApiClient";
import { SkillApiClient } from "./SkillApiClient";
import { TechApiClient } from "./TechApiClient";
import { TechTypeApiClient } from "./TechTypeApiClient";
import { UserApiClient } from "./UserApiClient";

/**
 * @class HorizonApiClient
 * @description HorizonApiClient
 */
export class HorizonApiClient {
  private building = new BuildingApiClient();
  private buildingType = new BuildingTypeApiClient();
  private resource = new ResourceApiClient();
  private pushNotifications = new PushNotificationApiClient();
  private role = new RoleApiClient();
  private user = new UserApiClient();
  private image = new ImageApiClient();
  private tech = new TechApiClient();
  private techType = new TechTypeApiClient();
  private skill = new SkillApiClient();
  private ship = new ShipApiClient();
  private cannon = new CannonApiClient();
  private basics = new GameBasicsApiClient();

  /**
   * @returns GameBasics
   */
  get GameBasics(): GameBasicsApiClient {
    return this.basics;
  }

  /**
   * @returns Image
   */
  get Image(): ImageApiClient {
    return this.image;
  }

  /**
   * @returns Building
   */
  get Building(): BuildingApiClient {
    return this.building;
  }

  /**
   * @returns BuildingType
   */
  get BuildingType(): BuildingTypeApiClient {
    return this.buildingType;
  }

  /**
   * @returns Resource
   */
  get Resource(): ResourceApiClient {
    return this.resource;
  }

  /**
   * @returns PushNotification
   */
  get PushNotification(): PushNotificationApiClient {
    return this.pushNotifications;
  }

  /**
   * @returns Role
   */
  get Role(): RoleApiClient {
    return this.role;
  }

  /**
   * @returns User
   */
  get User(): UserApiClient {
    return this.user;
  }

  /**
   * @returns Tech
   */
  get Tech(): TechApiClient {
    return this.tech;
  }

  /**
   * @returns TechType
   */
  get TechType(): TechTypeApiClient {
    return this.techType;
  }

  /**
   * @returns Skill
   */
  get Skill(): SkillApiClient {
    return this.skill;
  }

  /**
   * @returns Ship
   */
  get Ship(): ShipApiClient {
    return this.ship;
  }

  /**
   * @returns Cannon
   */
  get Cannon(): CannonApiClient {
    return this.cannon;
  }
}
