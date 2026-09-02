// services
import { makeRequest } from "../db/services";

// utils
import { toLocal } from "utils";

// config
import config from "../config";

// base
import { BaseApiClient } from "./utils/BaseApiClient";

// types
import {
  AuthResultDto,
  HorizonUserDto,
  HttpErrorDto,
  HttpResponse,
  LoggedUserDto,
  PhotoDto,
  UpdateHorizonUserDto,
} from "lib";

/** Keeps the `await result.json()` shape the auth pages are written against. */
type JsonResult<TData> = { json: () => Promise<TData> };

/**
 * @class UserApiClient
 * @description UserApiClient
 */
export class UserApiClient extends BaseApiClient<HorizonUserDto> {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "horizonUser";
  }

  /**
   * Logs an user
   * @param user - username
   * @param password - password
   * @returns Transaction result
   */
  async login(user: string, password: string): Promise<JsonResult<AuthResultDto>> {
    const { data, error } = await makeRequest<LoggedUserDto>(`auth/login`, "POST", {
      username: user,
      password,
    });
    if (data && data.user) {
      data.user.email = user;
      toLocal(config.user, data);
    }
    return {
      json: async () => ({ ...data, status: error ? error.status : 200, error }),
    };
  }

  /**
   * sign up
   * @param email - email
   * @param password - password
   * @returns Transaction result
   */
  async signUp(email: string, password: string): Promise<JsonResult<AuthResultDto>> {
    const { data, error } = await makeRequest<LoggedUserDto>(`auth/sign-up`, "POST", {
      email,
      password,
    });
    if (data && data.user) {
      data.user.email = email;
      toLocal(config.user, data);
    }
    return {
      json: async () => ({ ...data, status: error ? error.status : 200, error }),
    };
  }

  /**
   * Fetch owner data
   * @param userId - User id
   * @returns Owner
   */
  async fetchOwner(
    userId: number,
  ): Promise<JsonResult<HorizonUserDto & { status: number; error: HttpErrorDto | null }>> {
    const { data, error } = await makeRequest<HorizonUserDto>(
      `horizonUser/byUserId/${userId}`,
      "GET",
      null,
      this.authHeaders(),
    );
    return {
      json: async () => ({ ...data, status: error ? error.status : 200, error }),
    };
  }

  /**
   * Validates an email with a token
   * @param token - validation token
   * @returns refreshed token
   */
  async validateEmail(token: string) {
    const { data, error, status } = await makeRequest<LoggedUserDto>(`auth/email-validation`, "POST", {
      token,
    });
    return { data, status: error?.status ?? status, error };
  }

  /**
   * Get session
   * @returns the current session
   */
  async getSession() {
    return await this.validates();
  }

  /**
   * Validates a token
   * @returns refreshed token
   */
  async validates(): Promise<HttpResponse<LoggedUserDto>> {
    const { data, error, status } = await makeRequest<LoggedUserDto>(
      `auth/validate`,
      "GET",
      null,
      this.authHeaders(),
    );
    return { data, status: error?.status ?? status, error };
  }

  /**
   * Asks for a password recovery email
   * @param email - account email
   * @returns Transaction result
   * @todo the server (horizon-sever) does not expose this endpoint yet
   */
  async recovery(email: string): Promise<JsonResult<AuthResultDto>> {
    const { data, error, status } = await makeRequest<LoggedUserDto>(`auth/recovery`, "POST", {
      email,
    });
    return {
      json: async () => ({ ...data, status: error?.status ?? status, error }),
    };
  }

  /**
   * Updates the password of the recovering account
   * @param password - new password
   * @returns Transaction result
   * @todo the server (horizon-sever) does not expose this endpoint yet
   */
  async updatePassword(password: string) {
    const { data, error, status } = await makeRequest(
      `auth/update-password`,
      "POST",
      { password },
      this.authHeaders(),
    );
    return { data, status: error?.status ?? status, error };
  }

  /**
   * Logouts an user
   */
  async logout() {
    // the session only lives in the local storage, `AccountProvider` clears it
  }

  /**
   * @description Update user
   * @param user - User
   * @param photo - User photo
   * @returns Transaction status
   */
  async update(user: UpdateHorizonUserDto, photo?: PhotoDto) {
    // deleting rPassword
    delete user.rPassword;
    // saving photo
    if (photo) user.image = photo;

    // call service
    const { status, error } = await makeRequest<unknown, UpdateHorizonUserDto>(
      `${this.baseUrl}/${user.id}`,
      "PATCH",
      {
        ...user,
        lastUpdate: new Date().toISOString(),
      },
      this.authHeaders(),
    );
    if (error !== null) return { status, error: { message: error.message } };
    return { error, status: status === 204 ? 201 : status };
  }
}
