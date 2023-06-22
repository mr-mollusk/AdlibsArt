import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  VStack,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";
import { IArtwork } from "entities";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { artworksAPI } from "shared";
import { AddToCollection } from "widgets/addToCollection/addToCollection";

export const ArtworkPage: FC = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const { artwokID } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<IArtwork>();

  useEffect(() => {
    if (artwokID)
      artworksAPI.getArtworkById(artwokID).then((data) => {
        if (!data[0]) {
          setArtwork(data[1]);
        }
      });
  }, []);
  const deleteHandler = async () => {
    if (artwokID) {
      const [error] = await artworksAPI.deleteArtworkById(artwokID);
      if (!error) navigate("/");
    }
  };

  return (
    <PageLayout>
      <Modal
        isOpen={deleteDisclosure.isOpen}
        onClose={deleteDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подтвердите</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Вы уверены, что хотите удалить?</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={deleteDisclosure.onClose}
            >
              Закрыть
            </Button>
            <Button colorScheme="red" onClick={deleteHandler}>
              Удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex bg="cyan.200" minH="calc(100vh - 100px)">
        {artwork ? (
          <Container maxW="container.lg" py="40px">
            <Card w="100%" minH="300px">
              <CardHeader>
                <Flex justifyContent="flex-end">
                  {localStorage.getItem("isAdmin") === "True" && (
                    <HStack spacing="5px">
                      <EditIcon />
                      <IconButton
                        aria-label={""}
                        onClick={deleteDisclosure.onOpen}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </HStack>
                  )}
                </Flex>
              </CardHeader>

              <CardBody minH="300px">
                <HStack minH="300px">
                  <Image
                    w="35%"
                    src={artwork.imageUrl}
                    alignSelf="flex-start"
                  />
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
                    <Button onClick={onOpen}>Добавить в коллекцию</Button>

                    <AddToCollection onClose={onClose} isOpen={isOpen} />
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
