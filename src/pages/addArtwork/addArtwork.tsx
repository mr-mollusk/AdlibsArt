import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
  Spacer,
  Tag,
  TagLabel,
  Textarea,
  VStack,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { IAuthors, artworksAPI, authorsAPI } from "shared";
import { categoriesAPI } from "shared/api/categories";
import { ICategory } from "shared/api/categories/categories.types";
import {
  AuthorsAutocomplete,
  IAuthorsAutocomplete,
} from "shared/components/authorsAutocomplete";

export const AddArtwork = () => {
  const [categorySelect, setCategorySelect] = useState("");
  const [authorsSelect, setAuthorsSelect] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [authors, setAuthors] = useState<IAuthors[]>([]);

  const [categoryVariants, setCategoryVariants] = useState<ICategory[]>([]);
  const [authorsVariants, setAuthorsVariants] = useState<IAuthors[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPrevies] = useState<string[]>([]);

  const toast = useToast();

  const handleFileSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (files?.length === 0) {
      return;
    }
    const firstFile = files?.item(0);
    if (!firstFile) {
      return;
    }
    setFiles([firstFile]);
    setPrevies((prev) => {
      prev.forEach((str) => window.URL.revokeObjectURL(str));
      return [window.URL.createObjectURL(firstFile)];
    });
  };

  const handleClearFiles = () => {
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = null;
    }
    setFiles([]);
    setPrevies((prev) => {
      prev.forEach((str) => window.URL.revokeObjectURL(str));
      return [];
    });
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

  const handleAddAutoAuthor: IAuthorsAutocomplete["onChange"] = (selectedAuthor) => {
    const newAuthor = authors.find((author) => author.id === selectedAuthor!.id);
    if (!newAuthor && selectedAuthor) {
      setAuthors((prev) => [...prev, selectedAuthor]);
    } else {
      toast({
        status: "warning",
        title: "Автор уже добавлен",
      });
    }
  };

  const handleDeleteAuthor = (index: string) => {
    setAuthors([...authors.filter((element) => element.id !== index)]);
  };

  const handleAddArtwork = () => {
    const form = new FormData();
    form.append("Title", title);
    form.append("Description", description);
    form.append("PublisherName", publisherName);
    form.append("PublicationYear", publicationYear);
    let categoriesString = "";
    categories.forEach(
      (category, index) =>
        (categoriesString += `${index === 0 ? "" : ","}${category.id}`)
    );
    let authorsString = "";
    authors.forEach(
      (author, index) =>
        (authorsString += `${index === 0 ? "" : ","}${author.id}`)
    );
    console.log(authorsString);

    form.append("Categories", categoriesString);
    form.append("Authors", authorsString);

    if (files.length !== 0) {
      form.append("Image", files[0]);
    }
    console.log(form);

    artworksAPI.postArtworks(form);
  };

  return (
    <PageLayout>
      <Container maxW="container.lg" py="25px">
        <Card>
          <CardHeader>
            <Heading>Создание произведения</Heading>
          </CardHeader>
          <CardBody>
            <Flex>
              <VStack flex="1 1 28%">
                <FormControl>
                  <FormLabel>Обложка:</FormLabel>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  {previews.length === 1 && (
                    <VStack sx={{ mt: 4, maxH: "400px" }}>
                      <Image
                        sx={{ maxH: "350px" }}
                        src={previews[0]}
                        alt="preview"
                      />
                      <IconButton
                        aria-label="clear-files"
                        onClick={handleClearFiles}
                        icon={<DeleteIcon />}
                      />
                    </VStack>
                  )}
                </FormControl>
              </VStack>
              <Spacer />
              <VStack flex="1 1 68%">
                <FormControl>
                  <FormLabel>Название произведения:</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Описание:</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                    <AuthorsAutocomplete onChange={handleAddAutoAuthor} />
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
                <Heading fontSize="xl">Сведения об издательстве:</Heading>
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
                    <Input
                      value={publicationYear}
                      onChange={(e) => setPublicationYear(e.target.value)}
                      type="number"
                    />
                  </HStack>
                </FormControl>
              </VStack>
            </Flex>
          </CardBody>
          <CardFooter>
            <Center w="100%">
              <Button onClick={handleAddArtwork}>Создать</Button>
            </Center>
          </CardFooter>
        </Card>
      </Container>
    </PageLayout>
  );
};
