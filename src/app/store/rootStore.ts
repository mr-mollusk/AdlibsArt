import { makeAutoObservable } from "mobx";
import { ArtworksStore } from "widgets/artworksList/store";
import { UserStore } from "./userStore";
import { AuthorsStore } from "./authorsStore";
import { CategoriesStore } from "./categoriesStore";

export class RootStore {
  artworksStore: ArtworksStore;
  userStore: UserStore;
  authorsStore: AuthorsStore;
  categoriesStore: CategoriesStore;
  constructor() {
    this.artworksStore = new ArtworksStore(this);
    this.userStore = new UserStore(this);
    this.authorsStore = new AuthorsStore(this);
    this.categoriesStore = new CategoriesStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();
