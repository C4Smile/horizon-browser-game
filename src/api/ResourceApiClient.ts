// services
import { makeRequest } from "../db/services";

// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import { GameResourceDto, HttpFailure, PlayerResourceDto } from "lib";

/**
 * @class ResourceApiClient
 * @description ResourceApiClient
 */
export class ResourceApiClient extends BaseApiClient<GameResourceDto> {
  gameResources: GameResourceDto[] | null = null;
  playerResources: PlayerResourceDto[] | null = null;

  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "resources";
  }

  /**
   * @param userId - player id
   * @returns the player stock
   */
  async getMyResources(userId: number): Promise<PlayerResourceDto[] | HttpFailure> {
    const { data, error, status } = await makeRequest<PlayerResourceDto[]>(
      `${this.baseUrl}/player/${userId}`,
      "GET",
      null,
      this.authHeaders(),
    );
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }
}
