// config
import config from "../config";

// types
import { HttpResponse } from "lib";

const isAnError = (status: number) => status < 200 || status > 299;

/**
 * @description Make a request to the API
 * @param url - URL to make the request
 * @param method - Request method
 * @param body - Request body
 * @param h - Request headers
 * @returns Request response
 */
export async function makeRequest<TData = unknown, TBody = unknown>(
  url: string,
  method = "GET",
  body: TBody | null = null,
  h: HeadersInit | null = null,
): Promise<HttpResponse<TData>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(h ?? {}),
  };
  const options: RequestInit = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);

  const request = await fetch(`${config.apiUrl}${url}`, options);
  const data = (await request.json()) as TData;

  return {
    data,
    status: request.status,
    error: isAnError(request.status) ? { status: request.status, message: request.statusText } : null,
  };
}
