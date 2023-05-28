import {
  Box,
  Container,
  Flex,
  HStack,
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
      <Box bg="cyan.900" h="100%">
        <Container h="100%" maxW="container.lg">
          <Flex h="100%" alignItems="center" justifyContent="space-between">
            <HStack spacing="40px">
              <LinkBox>
                <LinkOverlay href="/">
                  <Heading
                    color="white"
                    textTransform="uppercase"
                    fontSize="xl"
                  >
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
            </HStack>
            <HStack spacing="40px">
              <Link color="white" href="/auth">
                <Text>Вход</Text>
              </Link>
              <Link color="white" href="/register">
                <Text>Регистрация</Text>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </header>
  );
};
