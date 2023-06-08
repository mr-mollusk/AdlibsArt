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
import { categoriesAPI } from "shared/api/categories";

export const CategoriesPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { categories, totalPages, pageIndex } = useStore(
    (store) => store.categoriesStore
  );
  const setCategories = useStore((store) =>
    store.categoriesStore.setCategories.bind(store.categoriesStore)
  );
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
    }
  }, [isOpen]);
  const handleGetCategories = async () => {
    const [error, data] = await categoriesAPI.getCategories({});
    if (!error) {
      console.log(data.items);

      setCategories(data.items, data.totalPages, data.pageIndex);
    }
  };
  const handleAddCategory = () => {
    categoriesAPI.addCategory({
      name: name,
      description: description,
    });
    handleGetCategories();
    onClose();
  };
  const handleDelete = async (id: number, index: number) => {
    const [error, data] = await categoriesAPI.deleteCategoryById(id);

    if (!error) handleGetCategories();
  };
  useEffect(() => {
    handleGetCategories();
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
        <VStack>
          <Button
            onClick={onOpen}
            alignSelf="flex-end"
            bg="cyan.600"
            color="white"
          >
            Добавить
          </Button>
          <Search searchType="categories" />
          {categories.map((category, index) => (
            <Card w="100%" bg="cyan.100" key={category.id}>
              <CardHeader>
                <Flex alignItems="center">
                  <Heading>{category.name}</Heading>
                  <Spacer />
                  <IconButton
                    aria-label="delete-button"
                    onClick={() => handleDelete(category.id, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{category.description}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
        <Pagination paginationType="categories" />
      </Container>
    </PageLayout>
  );
});
