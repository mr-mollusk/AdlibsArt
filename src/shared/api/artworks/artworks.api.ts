import {
  RequestData,
  apiInstance,
  FilteredArtworkRequest,
  PaginatedArtworkResponse,
} from "shared";
import { IArtworkID } from "./artworks.types";
import { IArtwork } from "entities";

export const artworksAPI = {
  async getArtworks(
    params: FilteredArtworkRequest
  ): Promise<RequestData<PaginatedArtworkResponse>> {
    try {
      const { data } = await apiInstance.get("/artworks/search", {
        params: params,
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async postArtworks(body: FormData): Promise<RequestData<IArtworkID>> {
    try {
      const { data } = await apiInstance.post("/artworks", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async getArtworkById(id: string): Promise<RequestData<IArtwork>> {
    try {
      const { data } = await apiInstance.get(`/artworks/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async deleteArtworkById(id: string): Promise<RequestData<IArtwork>> {
    try {
      const { data } = await apiInstance.delete(`/artworks/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
