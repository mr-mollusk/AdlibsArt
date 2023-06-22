import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useStore } from "app/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { ISearch } from "./search.types";
import { IAuthors, authorsAPI } from "shared";
import { ICategory } from "shared/api/categories/categories.types";
import { categoriesAPI } from "shared/api/categories";

export const Search: FC<ISearch> = observer(({ searchType }) => {
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");

  const [categorySelect, setCategorySelect] = useState("");
  const [authorsSelect, setAuthorsSelect] = useState("");

  const [publisherName, setPublisherName] = useState("");
  const [publicationYearFrom, setPublicationYearFrom] = useState("");
  const [publicationYearTo, setPublicationYearTo] = useState("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [authors, setAuthors] = useState<IAuthors[]>([]);

  const [categoryVariants, setCategoryVariants] = useState<ICategory[]>([]);
  const [authorsVariants, setAuthorsVariants] = useState<IAuthors[]>([]);

  const filterArtworksData = useStore((store) =>
    store.artworksStore.filterPage.bind(store.artworksStore)
  );
  const filterAuthorsData = useStore((store) =>
    store.authorsStore.filterPage.bind(store.authorsStore)
  );
  const filterCategoriesData = useStore((store) =>
    store.categoriesStore.filterPage.bind(store.categoriesStore)
  );
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilter = () => {
    switch (searchType) {
      case "artworks": {
        const categoriesIds = categories
          .map((category) => category.id)
          .join(",");
        const authorsIds = authors.map((author) => author.id).join(",");
        filterArtworksData(
          search,
          title,
          publisherName,
          publicationYearFrom,
          publicationYearTo,
          categoriesIds,
          authorsIds
        );
        break;
      }
      case "authors": {
        filterAuthorsData(search);
        break;
      }
      case "categories": {
        filterCategoriesData(search);
        break;
      }

      default:
        break;
    }
  };
  useEffect(() => {
    const handleCategories = async () => {
      const [error, data] = await categoriesAPI.getCategories({
        pageSize: 10000,
      });
      if (!error) {
        setCategoryVariants(data.items);
        setCategorySelect(data.items[0].name);
      }
    };
    const handleAuthors = async () => {
      const [error, data] = await authorsAPI.getAuthors({ pageSize: 10000 });
      console.log(data);

      if (!error) {
        setAuthorsVariants(data.items);
        setAuthorsSelect(data.items[0].name);
      }
    };
    handleCategories();
    handleAuthors();
  }, []);
  const handleAddCategory = () => {
    const newCategory = categoryVariants.find(
      (value) => value.name === categorySelect
    );

    if (newCategory) setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (index: number) => {
    setCategories([...categories.filter((element) => element.id !== index)]);
  };
  const handleAddAuthor = () => {
    const newAuthor = authorsVariants.find(
      (value) => value.name === authorsSelect
    );

    if (newAuthor) setAuthors([...authors, newAuthor]);
  };

  const handleDeleteAuthor = (index: string) => {
    setAuthors([...authors.filter((element) => element.id !== index)]);
  };
  return (
    <Box w="100%">
      <FormControl>
        <HStack>
          <InputGroup>
            <Input bg="white" onChange={(e) => inputHandler(e)} />
            <InputRightElement p="5px">
              <IconButton
                aria-label="Search database"
                icon={<Search2Icon />}
                size="sm"
                onClick={handleFilter}
              />
            </InputRightElement>
          </InputGroup>
          <Button onClick={handleFilter}>Найти</Button>
        </HStack>
      </FormControl>
      {searchType === "artworks" && (
        <Card mt="10px">
          <VStack flex="1 1 70%" p="20px">
            <FormControl>
              <FormLabel>Название произведения:</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Категории:</FormLabel>
              <Wrap>
                {categories.map((category) => (
                  <Tag key={`Тэг_категории_${category.id}`}>
                    <TagLabel>{category.name}</TagLabel>
                    <IconButton
                      aria-label=""
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tag>
                ))}
              </Wrap>
              <HStack>
                <Select
                  value={categorySelect}
                  onChange={(e) => setCategorySelect(e.target.value)}
                >
                  {categoryVariants.map((category) => (
                    <option
                      key={`Категория_${category.id}`}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleAddCategory}>Добавить</Button>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Авторы:</FormLabel>
              <Wrap>
                {authors.map((author) => (
                  <Tag key={`Тэг_автора_${author.id}`}>
                    <TagLabel>{author.name}</TagLabel>
                    <IconButton
                      aria-label=""
                      onClick={() => handleDeleteAuthor(author.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tag>
                ))}
              </Wrap>
              <HStack>
                <Select
                  value={authorsSelect}
                  onChange={(e) => setAuthorsSelect(e.target.value)}
                >
                  {authorsVariants.map((author) => (
                    <option key={`Автор_${author.id}`} value={author.name}>
                      {author.name}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleAddAuthor}>Добавить</Button>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel>Издательство:</FormLabel>
                <Input
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel whiteSpace="nowrap">Год издания:</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    value={publicationYearFrom}
                    onChange={(e) => setPublicationYearFrom(e.target.value)}
                  />
                </NumberInput>

                <Text>-</Text>
                <NumberInput min={0}>
                  <NumberInputField
                    value={publicationYearTo}
                    onChange={(e) => setPublicationYearTo(e.target.value)}
                  />
                </NumberInput>
              </HStack>
            </FormControl>
          </VStack>
        </Card>
      )}
    </Box>
  );
});
