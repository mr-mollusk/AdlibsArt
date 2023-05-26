import { Center, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header>
      <Center pr={30} justifyContent="flex-end" h="100%" bg="cyan.900">
        <LinkBox>
          <LinkOverlay href="/">
            <Heading color="white" textTransform="uppercase" fontSize="xl">
              Adlibs-Art
            </Heading>
          </LinkOverlay>
        </LinkBox>
      </Center>
    </header>
  );
};
