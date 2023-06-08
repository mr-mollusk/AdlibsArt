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
import { useStore } from "app/hooks/useStore";
import { PageLayout } from "app/layouts";
import { Pagination } from "features";
import { Search } from "features/search";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { authorsAPI } from "shared";

export const AuthorsPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");

  const { authors, totalPages, pageIndex } = useStore(
    (store) => store.authorsStore
  );
  const setAuthors = useStore((store) =>
    store.authorsStore.setAuthors.bind(store.authorsStore)
  );

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
    }
  }, [isOpen]);

  const handleAddAuthor = () => {
    authorsAPI.addAuthor({
      name: name,
      description: description,
      birthCountry: country,
    });
    onClose();
  };
  const handleDelete = (id: string, index: number) => {
    authorsAPI.deleteAuthorById(id);

    setAuthors(
      [...authors.slice(0, index), ...authors.slice(index)],
      totalPages,
      pageIndex
    );
  };
  useEffect(() => {
    const handleGetAuthors = async () => {
      const [error, data] = await authorsAPI.getAuthors({});
      if (!error) {
        console.log(data.items);

        setAuthors(data.items, data.totalPages, data.pageIndex);
      }
    };
    handleGetAuthors();
  }, []);
  return (
    <PageLayout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить автора</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Имя автора</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Описание</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Страна рождения</FormLabel>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="blue" onClick={handleAddAuthor}>
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.lg" py="20px">
        <VStack>
          <Button
            onClick={onOpen}
            alignSelf="flex-end"
            bg="cyan.600"
            color="white"
          >
            Добавить
          </Button>
          <Search searchType="authors" />
          {authors.map((author, index) => (
            <Card w="100%" bg="cyan.100" key={author.id}>
              <CardHeader>
                <Flex alignItems="center">
                  <Heading>{author.name}</Heading>
                  <Spacer />
                  <IconButton
                    aria-label="delete-button"
                    onClick={() => handleDelete(author.id, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{author.description}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
        <Pagination paginationType="authors" />
      </Container>
    </PageLayout>
  );
});
