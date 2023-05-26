import {
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header>
      <Flex
        h="100%"
        bg="cyan.900"
        alignItems="center"
        justifyContent="space-around"
      >
        <LinkBox>
          <LinkOverlay href="/">
            <Heading color="white" textTransform="uppercase" fontSize="xl">
              Adlibs-Art
            </Heading>
          </LinkOverlay>
        </LinkBox>
        <Link color="white" href="/">
          <Text>Каталог</Text>
        </Link>
        <Link color="white">
          <Text>Авторы</Text>
        </Link>
        <Link color="white">
          <Text>Категории</Text>
        </Link>
        <Link color="white">
          <Text>Коллекции</Text>
        </Link>
      </Flex>
    </header>
  );
};
