import {
  Container,
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  CardFooter,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useStore } from "app/hooks/useStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userStore = useStore((store) => store.userStore);
  const login = useStore((store) => store.userStore.login.bind(userStore));
  const loginHandler = () => {
    login(username, password);
    navigate("/");
  };
  return (
    <Container maxW="556px" py="30px">
      <Card>
        <CardHeader>
          <Heading>Вход</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing="20px">
            <FormControl>
              <FormLabel>Имя пользователя</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          <VStack w="100%">
            <FormControl display="flex" justifyContent="center">
              <Button bg="cyan.600" color="white" onClick={loginHandler}>
                Войти
              </Button>
            </FormControl>
            <Text>
              Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
            </Text>
          </VStack>
        </CardFooter>
      </Card>
    </Container>
  );
};
