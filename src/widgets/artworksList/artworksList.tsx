import { Heading, VStack, Text } from "@chakra-ui/react";
import { Artwork, IArtwork } from "entities";
import { FC, useEffect, useState } from "react";

export const ArtworksList: FC = () => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  useEffect(() => {
    fetch("https://25.39.246.253:50443/api/artworks?pageIndex=0&pageSize=10")
      .then((result) => result.json())
      .then((data) => setArtworks(data));
  }, []);
  if (artworks.length === 0) {
    return <Text>...loading</Text>;
  }
  return (
    <VStack padding={5} bg="cyan.200">
      <Heading>Книжные подборки</Heading>
      {artworks.map((artwork) => (
        <Artwork {...artwork} />
      ))}
    </VStack>
  );
};
