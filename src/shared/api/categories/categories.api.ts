import { RequestData, apiInstance } from "shared";
import {
  CategoriesRequest,
  ICategory,
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
  async addCategory(
    body: Omit<ICategory, "id">
  ): Promise<RequestData<PaginatedCategoriesResponse>> {
    try {
      const { data } = await apiInstance.post("/categories", body);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async deleteCategoryById(
    id: number
  ): Promise<RequestData<PaginatedCategoriesResponse>> {
    try {
      const { data } = await apiInstance.delete(`/categories/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
