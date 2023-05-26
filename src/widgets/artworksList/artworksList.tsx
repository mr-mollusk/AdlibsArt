import {
  Heading,
  VStack,
  LinkBox,
  LinkOverlay,
  Flex,
  CircularProgress,
  Container,
} from "@chakra-ui/react";
import { IArtwork } from "entities";
import { observer } from "mobx-react-lite";
import React, { FC, Suspense, useEffect, useState } from "react";
import { artworksAPI } from "shared";
import { useStore } from "./context";
import { Pagination } from "features";
import { Search } from "features/search";

const Artwork = React.lazy(() => import("../../entities/artwork/ui/artwork"));

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
    <Flex bg="cyan.200" alignItems="flex-start">
      <Container
        maxW="container.lg"
        paddingX={100}
        pt="40px"
        pb="40px"
        display="flex"
        flexDirection="column"
        minH="calc(100vh - 100px)"
        h="100%"
      >
        <Heading mb="26px">Каталог</Heading>
        <Search />
        <Suspense
          fallback={
            <Flex>
              <CircularProgress isIndeterminate />
            </Flex>
          }
        >
          <VStack my="20px">
            {store.artworks.map((artwork) => (
              <LinkBox key={artwork.id}>
                <LinkOverlay href={`/artwork/${artwork.id}`}>
                  <Artwork {...artwork} />
                </LinkOverlay>
              </LinkBox>
            ))}
          </VStack>
        </Suspense>

        <Pagination />
      </Container>
    </Flex>
  );
});
