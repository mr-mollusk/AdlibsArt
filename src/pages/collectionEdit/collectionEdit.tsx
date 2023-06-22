import {
  Button,
  Card,
  CardBody,
  Container,
  HStack,
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
  const downloadHandler = () => {
    fetch(
      `https://25.39.246.253:51443/api/collections/export/${collectionID}/xlsx`
    ).then(async (response) => {
      const data = await response.blob();
      const objectUrl = URL.createObjectURL(data);
      const templateLink = document.createElement("a");
      templateLink.style.display = "none";
      templateLink.href = objectUrl;
      templateLink.setAttribute("download", collectionID + ".xlsx");
      if (typeof templateLink.download === "undefined") {
        templateLink.setAttribute("target", "_blank");
      }
      document.body.appendChild(templateLink);
      templateLink.click();
      document.body.removeChild(templateLink);
      window.URL.revokeObjectURL(objectUrl);
      return;
    });
  };
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
        <HStack justifyContent="flex-end">
          <Button
            mb="20px"
            bg="cyan.600"
            color="white"
            onClick={downloadHandler}
          >
            Загрузить коллекцию
          </Button>
        </HStack>
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
