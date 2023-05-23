import { Center, Heading } from "@chakra-ui/react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header>
      <Center pr={30} justifyContent="flex-end" h="100%" bg="cyan.900">
        <Heading color="white" textTransform="uppercase" fontSize="xl">
          Adlibs-Art
        </Heading>
      </Center>
    </header>
  );
};
