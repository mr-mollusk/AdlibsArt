import { RequestData, apiInstance } from "shared";
import {
  CategoriesRequest,
  PaginatedCategoriesResponse,
} from "./categories.types";

export const categoriesAPI = {
  async getCategories(
    params: CategoriesRequest
  ): Promise<RequestData<PaginatedCategoriesResponse>> {
    try {
      const { data } = await apiInstance.get("/categories", {
        params: params,
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
