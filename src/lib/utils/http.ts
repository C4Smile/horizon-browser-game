import { HttpErrorDto } from "../entities/user/AccountDto";

/** What `makeRequest` resolves to. */
export type HttpResponse<TData> = {
  data: TData;
  status: number;
  error: HttpErrorDto | null;
};

/** What the api clients answer with when they swallow the error. */
export type HttpFailure = {
  status: number;
  error: { message: string };
};

/**
 * Narrows what the api clients answer with when the request did not go through.
 * @param value - value answered by an api client
 * @returns whether the value is a failure instead of the awaited payload
 */
export const isHttpFailure = <TData>(value: TData | HttpFailure): value is HttpFailure =>
  !!value && typeof value === "object" && "error" in value && "status" in value;
