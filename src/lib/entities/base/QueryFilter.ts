/**
 * Mirrors the server's `SortOrder` / `QueryFilter` (src/modules/models/types.ts).
 */
export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type QueryFilter = {
  sort: string;
  order: SortOrder;
  page: number;
  count: number;
};

/** Shape the api clients use to build the `?sort=&order=&page=&count=` query. */
export type BaseFilterDto = {
  sortingBy?: string;
  sortingOrder?: string;
  currentPage?: number;
  pageSize?: number;
};
