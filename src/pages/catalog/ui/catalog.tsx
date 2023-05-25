import { PageLayout } from "app/layouts";
import { FC } from "react";
import { ArtworksList } from "widgets";
import { ArtworksProvider } from "widgets/artworksList/context";

export const Catalog: FC = () => {
  return (
    <PageLayout>
      <ArtworksProvider>
        <ArtworksList />
      </ArtworksProvider>
    </PageLayout>
  );
};
