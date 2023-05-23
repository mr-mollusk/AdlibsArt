import { IAuthorShort, ICategoryShort } from "entities";

export interface IArtwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authors: IAuthorShort[];
  categories: ICategoryShort[];
}
