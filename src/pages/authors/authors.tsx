import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useStore } from "app/hooks/useStore";
import { PageLayout } from "app/layouts";
import { Pagination } from "features";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { authorsAPI } from "shared";

export const AuthorsPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { authors } = useStore((store) => store.authorsStore);
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
    console.log(name, description);
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
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button variant="ghost" onClick={handleAddAuthor}>
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.lg" py="20px">
        <VStack>
          <Button onClick={onOpen}>Добавить</Button>
          {authors.map((author) => (
            <Card w="100%">
              <CardHeader>
                <Heading>{author.name}</Heading>
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
