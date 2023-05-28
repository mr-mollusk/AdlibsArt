import { ArtworkPage, AuthPage, Catalog, RegisterPage } from "pages";
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
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
