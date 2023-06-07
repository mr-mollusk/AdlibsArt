import { ArtworkPage, AuthPage, Catalog, RegisterPage } from "pages";
import { AddArtwork } from "pages/addArtwork/addArtwork";
import { AuthorsPage } from "pages/authors";
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
  {
    path: "/add",
    element: <AddArtwork />,
  },
  { path: "/authors", element: <AuthorsPage /> },
]);
