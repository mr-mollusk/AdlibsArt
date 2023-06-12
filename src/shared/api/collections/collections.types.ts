export interface PaginatedCollectionsResponse {
  items: ICollection[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

type CollectionStation = "Private" | "Public";

export interface ICollection {
  id: string;
  name: string;
  description: string;
  image: string;
  accessStatus: CollectionStation;
}

export interface CollectionsRequest {
  query?: string;
  pageSize?: number;
  pageIndex?: number;
}
