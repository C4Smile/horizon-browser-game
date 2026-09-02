// services
import { makeRequest } from "../db/services";

// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import {
  BuildingQueueDto,
  EnqueueDto,
  GameBuildingDto,
  HttpFailure,
  HttpResponse,
  PlayerBuildingDto,
} from "lib";

/**
 * @class BuildingApiClient
 * @description BuildingApiClient
 */
export class BuildingApiClient extends BaseApiClient<GameBuildingDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "buildings";
  }

  /**
   * @param userId - player id
   * @returns buildings the player already owns
   */
  async getMyBuildings(userId: number): Promise<PlayerBuildingDto[] | HttpFailure> {
    const { data, error, status } = await makeRequest<PlayerBuildingDto[]>(
      `${this.baseUrl}/player/${userId}`,
      "GET",
      null,
      this.authHeaders(),
    );
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }

  /**
   * @param userId - player id
   * @returns the player building queue
   */
  async getMyQueue(userId: number): Promise<BuildingQueueDto[] | HttpFailure> {
    const { data, error, status } = await makeRequest<BuildingQueueDto[]>(
      `${this.baseUrl}/queue/player/${userId}`,
      "GET",
      null,
      this.authHeaders(),
    );
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }

  /**
   * @param dto - what to enqueue
   * @returns the raw http response
   */
  async enqueue(dto: EnqueueDto): Promise<HttpResponse<{ status: number }>> {
    return await makeRequest<{ status: number }, EnqueueDto>(
      `${this.baseUrl}/enqueue`,
      "POST",
      dto,
      this.authHeaders(),
    );
  }
}
