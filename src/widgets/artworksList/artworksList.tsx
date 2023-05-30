import {
  Heading,
  VStack,
  LinkBox,
  LinkOverlay,
  Flex,
  CircularProgress,
  Container,
  Spacer,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { FC, Suspense, useEffect } from "react";
import { artworksAPI } from "shared";
import { Pagination } from "features";
import { Search } from "features/search";
import { useStore } from "app/hooks/useStore";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Artwork = React.lazy(() => import("../../entities/artwork/ui/artwork"));

export const ArtworksList: FC = observer(() => {
  const store = useStore((store) => store.artworksStore);
  const navigate = useNavigate();
  useEffect(() => {
    artworksAPI.getArtworks({}).then((data) => {
      if (!data[0])
        store.setArtworks(data[1].items, data[1].totalPages, data[1].pageIndex);
    });
  }, [store]);

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
        <Flex>
          <Heading mb="26px">Каталог</Heading>
          <Spacer />
          <Button
            bg="cyan.600"
            color="white"
            onClick={() => {
              navigate("/add");
            }}
          >
            <HStack spacing="10px" alignItems="center" display="flex">
              <Text>Создать</Text>
              <AddIcon boxSize={3} />
            </HStack>
          </Button>
        </Flex>
        <Search />
        <Suspense
          fallback={
            <Flex alignItems="center" justifyContent="center">
              <CircularProgress isIndeterminate />
            </Flex>
          }
        >
          <VStack my="20px">
            {store.artworks.map((artwork) => (
              <LinkBox key={artwork.id} w="100%">
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
