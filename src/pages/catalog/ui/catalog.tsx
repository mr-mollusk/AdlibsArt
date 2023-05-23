import { PageLayout } from "app/layouts";
import { FC } from "react";
import { ArtworksList } from "widgets";

export const Catalog: FC = () => {
  return (
    <PageLayout>
      <ArtworksList />
    </PageLayout>
  );
};
