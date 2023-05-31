import { RequestData, apiInstance } from "shared";
import { CategoriesRequest, PaginatedAuthorsResponse } from "./authors.types";

export const authorsAPI = {
  async getAuthors(
    params: CategoriesRequest
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
};
