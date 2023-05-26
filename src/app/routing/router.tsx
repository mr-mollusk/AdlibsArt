import { ArtworkPage, Catalog } from "pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Catalog />,
  },

  {
    path: "artwork/:artwokID",
    
    element: <ArtworkPage />,
  },
]);
