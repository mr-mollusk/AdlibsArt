import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IArtwork } from "entities";
import { FC, useState } from "react";

interface ISearch {
  setArtworks: React.Dispatch<React.SetStateAction<IArtwork[]>>;
}

export const Search: FC<ISearch> = ({ setArtworks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const searchButtonHandler = () => {
    fetch(
      `https://25.39.246.253:50443/api/artworks/search?query=${searchQuery}&pageIndex=1&pageSize=10`
    )
      .then((result) => result.json())
      .then((data) => {
        setArtworks(data.artworks);
      });
  };
  return (
    <Box w="100%">
      <FormControl>
        <HStack>
          <InputGroup>
            <Input
              bg="white"
              onChange={(e) => inputHandler(e)}
              // value={searchQuery}
            />
            <InputRightElement p="5px">
              <IconButton
                aria-label="Search database"
                icon={<Search2Icon />}
                size="sm"
                onClick={searchButtonHandler}
              />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="teal" onClick={searchButtonHandler}>
            Поиск
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
};
