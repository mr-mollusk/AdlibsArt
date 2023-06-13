import { IArtwork } from "entities";

export type RequestData<D, E = unknown> = [true, E] | [false, D];

export type PromiseRequestData<T, E = unknown> = Promise<RequestData<T, E>>;

export type PaginatedArtworkResponse = {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  items: IArtwork[];
};

export type FilteredArtworkRequest = {
  sortOrder?: string;
  query?: string;
  pageIndex?: number;
  pageSize?: number;
  title?: string;
  publisherName?: string;
  publicationYearFrom?: string;
  publicationYearTo?: string;
  categories?: string;
  authors?: string;
};
