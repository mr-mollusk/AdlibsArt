import { RequestData, apiInstance } from "shared";
import {
  CollectionsRequest,
  ICollection,
  PaginatedCollectionsResponse,
} from "./collections.types";

export const collectionsAPI = {
  async getPersonalCollections(
    params: CollectionsRequest
  ): Promise<RequestData<PaginatedCollectionsResponse>> {
    try {
      const { data } = await apiInstance.get("/collections/personal", {
        params: params,
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async getCollectionById(id: string): Promise<RequestData<ICollection>> {
    try {
      const { data } = await apiInstance.get(`/collections/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },

  async addNewCollections(body: FormData) {
    try {
      const { data } = await apiInstance.post("/collections", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async addArtworkToCollection(collectionId: string, artworkId: string) {
    try {
      const { data } = await apiInstance.post(
        `/collections/${collectionId}/artworks`,
        {},
        { params: { artworkId: artworkId } }
      );

      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async getCollectionArtworks(collectionId: string) {
    try {
      const { data } = await apiInstance.get(
        `/collections/${collectionId}/artworks`
      );

      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async deleteArtworkFromCollection(collectionId: string, artworkId: string) {
    try {
      const { data } = await apiInstance.delete(
        `/collections/${collectionId}/artworks/${artworkId}`
      );

      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async deleteCollection(
    collectionId: string
  ): Promise<RequestData<ICollection>> {
    try {
      const { data } = await apiInstance.delete(`/collections/${collectionId}`);

      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
