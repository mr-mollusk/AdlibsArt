import { Heading, VStack, Text } from "@chakra-ui/react";
import { Artwork, IArtwork } from "entities";
import { Pagination } from "features";
import { FC, useEffect, useState } from "react";

export const ArtworksList: FC = () => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  useEffect(() => {
    fetch(
      "https://25.39.246.253:50443/api/artworks/search?pageIndex=1&pageSize=10"
    )
      .then((result) => result.json())
      .then((data) => {
        setArtworks(data.artworks);
        setPage(data.pageIndex);
        setPagesCount(data.totalPages);
      });
  }, []);

  if (artworks.length === 0) {
    return <Text>...loading</Text>;
  }
  return (
    <VStack paddingX={100} bg="cyan.200">
      <Heading>Книжные подборки</Heading>
      {artworks.map((artwork) => (
        <Artwork key={artwork.id} {...artwork} />
      ))}
      <Pagination
        pageIndex={page}
        totalPages={pagesCount}
        setPage={setPage}
        setArtworks={setArtworks}
      />
    </VStack>
  );
};
