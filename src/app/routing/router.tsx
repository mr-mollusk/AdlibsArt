import {
  ArtworkPage,
  AuthPage,
  Catalog,
  CategoriesPage,
  CollectionEdit,
  CollectionsPage,
  RegisterPage,
} from "pages";
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
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/collections", element: <CollectionsPage /> },
  { path: "/collection/:collectionID", element: <CollectionEdit /> },
]);
