import { makeAutoObservable } from "mobx";
import { ArtworksStore } from "widgets/artworksList/store";

export class RootStore {
  artworksStore: ArtworksStore;
  constructor() {
    this.artworksStore = new ArtworksStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();
