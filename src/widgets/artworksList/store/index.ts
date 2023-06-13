import { RootStore } from "app/store/rootStore";
import { IArtwork } from "entities";
import { makeAutoObservable } from "mobx";
import { artworksAPI } from "shared";

export class ArtworksStore {
  artworks: IArtwork[];
  query: string;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  constructor(public rootStore: RootStore) {
    this.artworks = [];
    this.query = "";
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.totalPages = 1;

    makeAutoObservable(this);
  }

  getArtworks() {
    return this.artworks;
  }
  async setArtworks(
    newArtworks: IArtwork[],
    totalPages: number,
    pageIndex: number,
    query: string = ""
  ) {
    this.artworks = newArtworks;
    this.totalPages = totalPages;
    this.pageIndex = pageIndex;
    this.query = query;
  }
  async changePage(newPage: number) {
    const data = await artworksAPI.getArtworks({
      pageIndex: newPage,
      query: this.query,
    });

    if (!data[0]) {
      this.setArtworks(data[1].items, data[1].totalPages, data[1].pageIndex);
      console.log(this.artworks);
    }
  }
  async filterPage(
    query: string,
    title: string,
    publisherName: string,
    publicationYearFrom: string,
    publicationYearTo: string,
    categories: string,
    authors: string
  ) {
    const data = await artworksAPI.getArtworks({
      query: query,
      title: title,
      publisherName: publisherName,
      publicationYearFrom: publicationYearFrom,
      publicationYearTo: publicationYearTo,
      categories: categories,
      authors: authors,
    });
    if (!data[0]) {
      this.artworks = data[1].items;
      this.pageIndex = data[1].pageIndex;
      this.totalPages = data[1].totalPages;
      this.query = query;
    }
  }
}
