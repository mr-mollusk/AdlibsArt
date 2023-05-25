import * as React from "react";
import { ArtworksStore } from "../store";

const StoreContext = React.createContext<ArtworksStore | null>(null);

const store = new ArtworksStore();

export const ArtworksProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStore<Selected = unknown>(callback: (store: ArtworksStore) => Selected) {
  const context =  React.useContext(StoreContext);
  if(!context){
    throw new Error('Я еблан, беру то, что не в контексте, мать в кино водил')
  }
  return callback(context);
}
