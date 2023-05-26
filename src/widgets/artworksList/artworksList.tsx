import { Heading, VStack, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Artwork, IArtwork } from "entities";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { artworksAPI } from "shared";
import { useStore } from "./context";
import { Pagination } from "features";
import { Search } from "features/search";

export const ArtworksList: FC = observer(() => {
  const store = useStore((store) => store);
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  useEffect(() => {
    artworksAPI.getArtworks({}).then((data) => {
      if (!data[0])
        store.setArtworks(
          data[1].artworks,
          data[1].totalPages,
          data[1].pageIndex
        );
    });
  }, [store]);
  useEffect(() => {
    setArtworks(store.getArtworks());
  }, [store.artworks]);
  return (
    <VStack paddingX={100} bg="cyan.200" alignItems="flex-start">
      <Heading>Каталог</Heading>
      <Search />
      {artworks.length !== 0 ? (
        store.artworks.map((artwork) => (
          <LinkBox key={artwork.id}>
            <LinkOverlay href={`/artwork/${artwork.id}`}>
              <Artwork {...artwork} />
            </LinkOverlay>
          </LinkBox>
        ))
      ) : (
        <Text>Либо идет загрузка, либо, Никита, почини пагинацию</Text>
      )}
      <Pagination />
    </VStack>
  );
});
