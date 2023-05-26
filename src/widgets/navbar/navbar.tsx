import { VStack, Text, Link } from "@chakra-ui/react";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <aside>
      <VStack w="100%" h="100%" bg="cyan.600">
        <Link href="/">
          <Text fontSize="2xl" color="white">
            Каталог
          </Text>
        </Link>
      </VStack>
    </aside>
  );
};
