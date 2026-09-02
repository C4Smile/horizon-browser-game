// services
import { makeRequest } from "../db/services";

// utils
import { fromLocal, toLocal } from "utils";

// config
import config from "../config";

// types
import { GameBasicsDto, HttpFailure, LoggedUserDto } from "lib";

/**
 * @class GameBasicsApiClient
 * @description GameBasicsApiClient
 */
export class GameBasicsApiClient {
  /**
   * @description Get game data
   * @param userId - player id
   * @returns Result list
   */
  async gameData(userId: number): Promise<GameBasicsDto | HttpFailure> {
    const { data, error, status } = await makeRequest<GameBasicsDto>(`game/${userId}`, "GET", null, {
      Authorization: "Bearer " + fromLocal<LoggedUserDto>(config.user, "object")?.token,
    });
    if (error !== null) return { status, error: { message: error.message } };

    // saving game data
    toLocal(config.hash, data);
    return data;
  }
}
