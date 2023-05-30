import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";
import { IArtwork } from "entities";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artworksAPI } from "shared";

export const ArtworkPage: FC = observer(() => {
  const { artwokID } = useParams();
  const [artwork, setArtwork] = useState<IArtwork>();

  useEffect(() => {
    if (artwokID)
      artworksAPI.getArtworkById(artwokID).then((data) => {
        if (!data[0]) {
          setArtwork(data[1]);
        }
      });
  }, []);

  return (
    <PageLayout>
      <Flex bg="cyan.200" minH="calc(100vh - 100px)">
        {artwork ? (
          <Container maxW="container.lg" py="40px">
            <Card w="100%" minH="300px">
              <CardHeader>
                <Flex justifyContent="flex-end">
                  <HStack spacing="5px">
                    <EditIcon />
                    <DeleteIcon />
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody minH="300px">
                <HStack minH="300px">
                  <Image w="35%" src={artwork.imageUrl} />
                  <VStack h="100%" alignItems="flex-start">
                    <Heading>{artwork.title}</Heading>
                    <Text>{artwork.description}</Text>
                    <VStack alignItems="flex-start">
                      <Heading size="md">Категории:</Heading>
                      <Wrap>
                        {artwork.categories.map((category) => (
                          <Tag key={category.id} bg="cyan.100" color="black">
                            {category.name}
                          </Tag>
                        ))}
                      </Wrap>
                    </VStack>
                    <VStack alignItems="flex-start">
                      <Heading size="md">Авторы:</Heading>
                      <Wrap>
                        {artwork.authors.map((author) => (
                          <Text key={author.id}>{author.name}</Text>
                        ))}
                      </Wrap>
                    </VStack>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Container>
        ) : (
          <Flex flex="1 1 100%" alignItems="center" justifyContent="center">
            <CircularProgress isIndeterminate />
          </Flex>
        )}
      </Flex>
    </PageLayout>
  );
});
