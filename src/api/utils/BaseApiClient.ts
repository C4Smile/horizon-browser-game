// services
import { makeRequest } from "../../db/services";

// utils
import { fromLocal } from "utils";

// config
import config from "../../config";

// types
import { BaseFilterDto, HttpFailure, LoggedUserDto } from "lib";

const defaultQuery: Required<BaseFilterDto> = {
  sortingBy: "id",
  sortingOrder: "asc",
  currentPage: 0,
  pageSize: 50,
};

/**
 * @class BaseApiClient
 * @description it has all base method
 */
export class BaseApiClient<TDto> {
  baseUrl = "";

  /**
   * @returns the authorization header of the logged user
   */
  protected authHeaders(): HeadersInit {
    return {
      Authorization: "Bearer " + fromLocal<LoggedUserDto>(config.user, "object")?.token,
    };
  }

  /**
   * @description Get all objects
   * @param query - query parameters
   * @returns Result list
   */
  async getAll(query: BaseFilterDto = defaultQuery): Promise<TDto[] | HttpFailure> {
    const { sortingBy, sortingOrder, currentPage, pageSize } = { ...defaultQuery, ...query };
    const { data, error, status } = await makeRequest<TDto[]>(
      `${this.baseUrl}?sort=${sortingBy}&order=${sortingOrder}&page=${currentPage}&count=${pageSize}`,
    );
    if (error !== null) return { status, error: { message: error.message } };
    return data;
  }

  /**
   * @description Get entity by id
   * @param id - object id
   * @returns object
   */
  async getById(id: number): Promise<TDto | HttpFailure> {
    const { data, error, status } = await makeRequest<TDto[]>(
      `${this.baseUrl}/${id}`,
      "GET",
      null,
      this.authHeaders(),
    );
    if (error !== null) return { status, error: { message: error.message } };
    return data[0];
  }
}
