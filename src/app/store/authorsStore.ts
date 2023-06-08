import { makeAutoObservable } from "mobx";
import { IAuthors, authorsAPI } from "shared";
import { RootStore } from "./rootStore";

export class AuthorsStore {
  authors: IAuthors[];
  query: string;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  constructor(public rootStore: RootStore) {
    this.authors = [];
    this.query = "";
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.totalPages = 1;
    makeAutoObservable(this);
  }

  getArtworks() {
    return this.authors;
  }
  async setAuthors(
    newAuthors: IAuthors[],
    totalPages: number,
    pageIndex: number,
    query: string = ""
  ) {
    this.authors = newAuthors;
    this.totalPages = totalPages;
    this.pageIndex = pageIndex;
    this.query = query;
  }
  async changePage(newPage: number) {
    const data = await authorsAPI.getAuthors({
      pageIndex: newPage,
      query: this.query,
    });

    if (!data[0]) {
      this.setAuthors(data[1].items, data[1].totalPages, data[1].pageIndex);
    }
  }
  async filterPage(query: string) {
    const data = await authorsAPI.getAuthors({ query: query });
    if (!data[0]) {
      this.authors = data[1].items;
      this.pageIndex = data[1].pageIndex;
      this.totalPages = data[1].totalPages;
      this.query = query;
    }
  }
}
