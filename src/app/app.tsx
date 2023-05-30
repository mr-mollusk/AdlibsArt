import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { StoreProvider } from "./context";
import { store } from "./store/rootStore";

function App() {
  return (
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
