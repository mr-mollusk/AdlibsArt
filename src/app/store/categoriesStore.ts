import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { categoriesAPI } from "shared/api/categories";
import { ICategory } from "shared/api/categories/categories.types";

export class CategoriesStore {
  categories: ICategory[];
  query: string;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  constructor(public rootStore: RootStore) {
    this.categories = [];
    this.query = "";
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.totalPages = 1;
    makeAutoObservable(this);
  }

  getCategories() {
    return this.categories;
  }
  async setCategories(
    newCategories: ICategory[],
    totalPages: number,
    pageIndex: number,
    query: string = ""
  ) {
    this.categories = newCategories;
    this.totalPages = totalPages;
    this.pageIndex = pageIndex;
    this.query = query;
  }
  async changePage(newPage: number) {
    const data = await categoriesAPI.getCategories({
      pageIndex: newPage,
      query: this.query,
    });

    if (!data[0]) {
      this.setCategories(data[1].items, data[1].totalPages, data[1].pageIndex);
    }
  }
  async filterPage(query: string) {
    const data = await categoriesAPI.getCategories({ query: query });
    if (!data[0]) {
      this.categories = data[1].items;
      this.pageIndex = data[1].pageIndex;
      this.totalPages = data[1].totalPages;
      this.query = query;
    }
  }
}
