export interface PaginatedCategoriesResponse {
  items: ICategory[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface CategoriesRequest {
  query?: string;
  pageSize?: number;
  pageIndex?: number;
}
