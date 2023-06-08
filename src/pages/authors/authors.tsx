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
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { authorsAPI } from "shared";

export const AuthorsPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");

  const { authors } = useStore((store) => store.authorsStore);
  const setAuthors = useStore((store) =>
    store.authorsStore.setAuthors.bind(store.authorsStore)
  );
  const handleGetAuthors = async () => {
    const [error, data] = await authorsAPI.getAuthors({});
    if (!error) {
      setAuthors(data.items, data.totalPages, data.pageIndex);
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setCountry("");
    }
  }, [isOpen]);

  const handleAddAuthor = () => {
    authorsAPI.addAuthor({
      name: name,
      description: description,
      birthCountry: country,
    });
    handleGetAuthors();
    onClose();
  };
  const handleDelete = async (id: string) => {
    const [error] = await authorsAPI.deleteAuthorById(id);
    if (!error) handleGetAuthors();
  };
  useEffect(() => {
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
          {authors.map((author) => (
            <Card w="100%" bg="cyan.100" key={author.id}>
              <CardHeader>
                <Flex alignItems="center">
                  <Heading>{author.name}</Heading>
                  <Spacer />
                  <IconButton
                    aria-label="delete-button"
                    onClick={() => handleDelete(author.id)}
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
