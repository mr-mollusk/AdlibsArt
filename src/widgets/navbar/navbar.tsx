import { VStack, Text, Link } from "@chakra-ui/react";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <aside>
      <VStack>
        <Link>
          <Text fontSize="2xl">Каталог</Text>
        </Link>
      </VStack>
    </aside>
  );
};
