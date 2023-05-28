import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <Container maxW="556px" py="30px">
      <Card>
        <CardHeader>
          <Heading>Регистрация</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing="20px">
            <FormControl>
              <FormLabel>Имя пользователя</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Электронная почта</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Пароль</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Повторите пароль</FormLabel>
              <Input type="password" />
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
              <Button bg="cyan.600" color="white">
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
};
