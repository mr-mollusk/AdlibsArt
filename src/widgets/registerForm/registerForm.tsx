import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useStore } from "app/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { authAPI } from "shared/api/auth/auth.api";
// import { Link } from "react-router-dom";

export const RegisterForm = observer(() => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const store = useStore((store) => store.userStore);
  const formHandle = async () => {
    if (name && email && password && passwordCheck) {
      if (password === passwordCheck) {
        store.username = name;
        store.email = email;
        store.password = password;
        const [error, data] = await authAPI.signUp({
          username: name,
          email: email,
          password: password,
        });

        if (!error) {
          console.log(data);

          toast({
            title: "Вы успешно зарегистрированы",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          //@ts-ignore
          data.forEach((error) =>
            toast({
              title: error.code,
              description: error.description,
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          );
        }
      } else
        toast({
          title: "Пароли не совпадают",
          description: "Попробуйте ещё раз",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
    } else
      toast({
        title: "Не хватает данных",
        description: "Пожалуйста, заполните все поля",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
  };

  return (
    <Container maxW="556px" py="30px">
      <Card>
        <CardHeader>
          <Heading>Регистрация</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing="20px">
            <FormControl isInvalid={!name}>
              <FormLabel>Имя пользователя</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
              <FormErrorMessage>
                Поле обязательно для заполнения
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!email}>
              <FormLabel>Электронная почта</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              <FormErrorMessage>
                Поле обязательно для заполнения
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!password || password.length < 5}>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!password ? (
                <FormErrorMessage>
                  Поле обязательно для заполнения
                </FormErrorMessage>
              ) : (
                <FormErrorMessage>
                  Пароль должен содержать не меньше 5 символов
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!passwordCheck || passwordCheck !== password}
            >
              <FormLabel>Повторите пароль</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
              {!passwordCheck ? (
                <FormErrorMessage>
                  Поле обязательно для заполнения
                </FormErrorMessage>
              ) : (
                <FormErrorMessage>Пароли должны совпадать</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <HStack>
                <Checkbox />
                <FormLabel>
                  Я согласен с условиями использования ресурса
                </FormLabel>
              </HStack>
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          <VStack w="100%">
            <FormControl display="flex" justifyContent="center">
              <Button bg="cyan.600" color="white" onClick={formHandle}>
                Зарегистрироваться
              </Button>
            </FormControl>
            <Text>
              Уже зарегистрированны? <Link href="/auth">Войти</Link>
            </Text>
          </VStack>
        </CardFooter>
      </Card>
    </Container>
  );
});
