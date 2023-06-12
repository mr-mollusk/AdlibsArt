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
import { useStore } from "app/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";

export const Header: FC = observer(() => {
  const [isLogin, setIsLogin] = useState(false);
  const userStore = useStore((store) => store.userStore);
  const logout = useStore((store) => store.userStore.logout.bind(userStore));
  useEffect(() => {
    const login = localStorage.getItem("accessToken");
    if (login) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userStore.isLogin, isLogin]);

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
              <Link color="white" href="/authors">
                <Text>Авторы</Text>
              </Link>
              <Link color="white" href="/categories">
                <Text>Категории</Text>
              </Link>
              <Link color="white" href="/collections">
                <Text>Коллекции</Text>
              </Link>
            </HStack>
            {isLogin ? (
              <Link color="white" onClick={logout}>
                <Text>Выход</Text>
              </Link>
            ) : (
              <HStack spacing="40px">
                <Link color="white" href="/auth">
                  <Text>Вход</Text>
                </Link>
                <Link color="white" href="/register">
                  <Text>Регистрация</Text>
                </Link>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>
    </header>
  );
});
