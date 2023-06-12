import {
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";
import { IArtwork } from "entities";
import Artwork from "entities/artwork/ui/artwork";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collectionsAPI } from "shared";

export const CollectionEdit: FC = () => {
  const { collectionID } = useParams();
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionArtworks, setCollectionArtworks] = useState<IArtwork[]>([]);

  const handleGetCollection = async () => {
    if (collectionID) {
      const [error, data] = await collectionsAPI.getCollectionById(
        collectionID
      );
      if (!error) {
        console.log(data);
        
        setCollectionName(data.name);
        setCollectionDescription(data.description);
        const [error, artworks] = await collectionsAPI.getCollectionArtworks(
          collectionID
        );
        if (!error) {
          setCollectionArtworks(artworks);
        }
      }
    }
  };
  useEffect(() => {
    handleGetCollection();
  }, []);
  return (
    <PageLayout>
      <Container maxW="container.lg" py="20px">
        <Card mb="20px">
          <CardBody>
            <VStack>
              <Heading>{collectionName}</Heading>
              <Text>{collectionDescription}</Text>
            </VStack>
          </CardBody>
        </Card>
        <VStack>
          {collectionArtworks.map((artwork) => (
            <Artwork key={artwork.id} {...artwork} deleteButton />
          ))}
        </VStack>
      </Container>
    </PageLayout>
  );
};
