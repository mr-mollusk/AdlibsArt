import { RequestData, apiInstance } from "shared";
import {
  AuthorsRequest,
  IAuthors,
  PaginatedAuthorsResponse,
} from "./authors.types";

export const authorsAPI = {
  async getAuthors(
    params: AuthorsRequest
  ): Promise<RequestData<PaginatedAuthorsResponse>> {
    try {
      const { data } = await apiInstance.get("/authors/search", {
        params: params,
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async addAuthor(
    body: Omit<IAuthors, "id">
  ): Promise<RequestData<PaginatedAuthorsResponse>> {
    try {
      const { data } = await apiInstance.post("/authors", body);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async deleteAuthorById(
    id: string
  ): Promise<RequestData<PaginatedAuthorsResponse>> {
    try {
      const { data } = await apiInstance.delete(`/authors/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
