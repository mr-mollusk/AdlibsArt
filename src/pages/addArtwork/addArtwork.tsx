import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Tag,
  TagLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { PageLayout } from "app/layouts";

export const AddArtwork = () => {
  return (
    <PageLayout>
      <Container maxW="container.lg" py="25px">
        <Card>
          <CardHeader>
            <Heading>Создание произведения</Heading>
          </CardHeader>
          <CardBody>
            <Flex>
              <VStack flex="1 1 30%">
                <FormControl>
                  <FormLabel>Обложка:</FormLabel>
                  <Input type="file" />
                </FormControl>
              </VStack>
              <VStack flex="1 1 70%">
                <FormControl>
                  <FormLabel>Название произведения:</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Описание:</FormLabel>
                  <Textarea />
                </FormControl>
                <FormControl>
                  <FormLabel>Категории:</FormLabel>
                  <Tag>
                    <TagLabel>Тут щас заебашим категории</TagLabel>
                  </Tag>
                </FormControl>
                <FormControl>
                  <FormLabel>Авторы:</FormLabel>
                  <Tag>
                    <TagLabel>А тут авторов</TagLabel>
                  </Tag>
                </FormControl>
                <Heading fontSize="xl">Сведения об издательстве:</Heading>
                <FormControl>
                  <HStack>
                    <FormLabel>Издательство:</FormLabel>
                    <Input />
                  </HStack>
                </FormControl>
                <FormControl>
                  <HStack>
                    <FormLabel whiteSpace="nowrap">Год издания:</FormLabel>
                    <Input />
                  </HStack>
                </FormControl>
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </PageLayout>
  );
};
