export interface PaginatedAuthorsResponse {
  items: IAuthors[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IAuthors {
  id: number;
  name: string;
  description: string;
}

export interface CategoriesRequest {
  query?: string;
  pageSize?: number;
  pageIndex?: number;
  
}
