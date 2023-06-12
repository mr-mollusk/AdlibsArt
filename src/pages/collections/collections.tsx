import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";
import { FC, useEffect, useState } from "react";
import { ICollection, collectionsAPI } from "shared";

export const CollectionsPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collections, setCollections] = useState<ICollection[]>([]);
  const handleGetPersonalCollections = async () => {
    const [error, data] = await collectionsAPI.getPersonalCollections({});
    if (!error) {
      setCollections(data.items);
    }
  };
  const handleAddCategory = async () => {
    const form = new FormData();
    form.append("Name", name);
    form.append("Description", description);
    form.append("AccessStatus", "public");
    const [error] = await collectionsAPI.addNewCollections(form);
    if (!error) {
      handleGetPersonalCollections();
      onClose();
    }
  };
  const deleteHandler = async (
    collectionID: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    collectionsAPI.deleteCollection(collectionID);
    e.stopPropagation();
  };
  useEffect(() => {
    handleGetPersonalCollections();
  }, []);

  return (
    <PageLayout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить коллекцию</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Название</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Описание</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="blue" onClick={handleAddCategory}>
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.lg" py="20px">
        <VStack alignItems="flex-start">
          <Button
            onClick={onOpen}
            alignSelf="flex-end"
            bg="cyan.600"
            color="white"
          >
            Добавить
          </Button>
          <Heading>Мои коллекции</Heading>
          {collections.length !== 0 ? (
            collections.map((collection) => (
              <LinkBox w="100%">
                <Card w="100%">
                  <CardHeader>
                    <Flex>
                      <Heading>{collection.name}</Heading>
                      <Spacer />
                      <IconButton
                        zIndex="2"
                        aria-label={""}
                        onClick={(e) => deleteHandler(collection.id, e)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Flex>
                  </CardHeader>

                  <LinkOverlay href={`/collection/${collection.id}`}>
                    <CardBody>
                      <Text>{collection.description}</Text>
                    </CardBody>
                  </LinkOverlay>
                </Card>
              </LinkBox>
            ))
          ) : (
            <Text>Здесь пока пусто</Text>
          )}
        </VStack>
      </Container>
    </PageLayout>
  );
};
