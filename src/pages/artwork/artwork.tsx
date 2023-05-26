import { PageLayout } from "app/layouts";
import { Artwork, IArtwork } from "entities";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artworksAPI } from "shared";

export const ArtworkPage: FC = () => {
  const { artwokID } = useParams();
  const [artwork, setArtwork] = useState<IArtwork>({
    title: "",
    id: "1",
    description: "",
    imageUrl: "",
    authors: [],
    categories: [],
  });
  useEffect(() => {
    if (artwokID)
      artworksAPI.getArtworkById(artwokID).then((data) => {
        if (!data[0]) setArtwork(data[1]);
      });
  }, []);

  return (
    <PageLayout>
      <Artwork {...artwork} />
    </PageLayout>
  );
};
