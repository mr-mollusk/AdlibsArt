import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer>
      <Center h={50} bg="cyan.900">
        <Text color="whiteAlpha.700">Made by VkusNuts tech</Text>
      </Center>
    </footer>
  );
};
