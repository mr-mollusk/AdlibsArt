import { makeAutoObservable } from "mobx";
import { ArtworksStore } from "widgets/artworksList/store";
import { UserStore } from "./userStore";

export class RootStore {
  artworksStore: ArtworksStore;
  userStore: UserStore;
  constructor() {
    this.artworksStore = new ArtworksStore(this);
    this.userStore = new UserStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();
