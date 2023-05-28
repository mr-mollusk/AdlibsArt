import { StoreContext } from "app/context";
import { RootStore } from "app/store/rootStore";
import { useContext } from "react";

export const useStore = <Selected = unknown>(
  selector: (store: RootStore) => Selected
) => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "Ты дурак использовать хук вне контекста? (это разрабу если что)"
    );
  }
  return selector(context);
};
