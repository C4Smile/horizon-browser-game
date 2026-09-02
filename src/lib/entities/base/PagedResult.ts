/**
 * Mirrors the server's `PagedResult<TDto>` (src/modules/models/types.ts).
 */
export type PagedResult<TDto> = {
  items: TDto[];
  total: number;
};
