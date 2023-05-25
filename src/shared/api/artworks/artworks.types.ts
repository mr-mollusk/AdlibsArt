export interface IArtworkBody {
  Title: string;
  Description?: string;
  Image?: string;
  PublisherName?: string;
  PublicationYear?: number;
  AuthorIds?: string[];
  CategoryIds?: number[];
}

export interface IArtworkID {
  id: string;
}
