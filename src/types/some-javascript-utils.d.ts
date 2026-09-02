/**
 * `some-javascript-utils` ships plain CommonJS without typings, so the bits the
 * game uses are declared here.
 */
declare module "some-javascript-utils" {
  export function toSlug(string: string): string;
}

declare module "some-javascript-utils/array" {
  export function sortBy<T>(
    array: T[],
    attribute?: string,
    asc?: boolean,
    auxFunction?: (item: T) => unknown,
  ): T[];
}

declare module "some-javascript-utils/browser" {
  export function createCookie(name: string, days: number, value: string): void;
  export function getCookie(name: string): string;
  export function deleteCookie(name: string): void;
  export function scrollTo(x: number, y: number, dealer?: HTMLElement | null): void;
}

/** `@fontsource/*` packages only ship css, imported for its side effect. */
declare module "@fontsource/poppins";
