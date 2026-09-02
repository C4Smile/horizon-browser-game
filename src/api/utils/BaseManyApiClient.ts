// services
import { makeRequest } from "../../db/services";

// utils
import { fromLocal } from "utils";

// config
import config from "../../config";

// types
import { HttpErrorDto, LoggedUserDto } from "lib";

/**
 * @class BaseManyApiClient
 * @description BaseManyApiClient
 */
export class BaseManyApiClient<TDto> {
  baseUrl = "";
  idAttribute = "";
  idsAttribute = "";

  /**
   * @param baseUrl string url
   * @param idAttribute id url
   * @param idsAttribute ids url
   */
  constructor(baseUrl: string, idAttribute: string, idsAttribute: string) {
    this.baseUrl = baseUrl;
    this.idAttribute = idAttribute;
    this.idsAttribute = idsAttribute;
  }

  /**
   * @param entityId id of the entity
   * @returns many relationships
   */
  async get(entityId: number): Promise<{ error: HttpErrorDto | null; items: TDto[]; status: number }> {
    // call service
    const { error, data, status } = await makeRequest<TDto[]>(
      `${this.baseUrl}/${entityId}`,
      "GET",
      null,
      {
        Authorization: "Bearer " + fromLocal<LoggedUserDto>(config.user, "object")?.token,
      },
    );

    return { error, items: data, status: status === 204 ? 201 : status };
  }
}
