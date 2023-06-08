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
import { useStore } from "app/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { ISearch } from "./search.types";

export const Search: FC<ISearch> = observer(({ searchType }) => {
  const [search, setSearch] = useState("");
  const filterArtworksData = useStore((store) =>
    store.artworksStore.filterPage.bind(store.artworksStore)
  );
  const filterAuthorsData = useStore((store) =>
    store.authorsStore.filterPage.bind(store.authorsStore)
  );
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilter = () => {
    switch (searchType) {
      case "artworks": {
        filterArtworksData(search);
        break;
      }
      case "authors": {
        filterAuthorsData(search);
        break;
      }
      default:
        break;
    }
  };
  return (
    <Box w="100%">
      <FormControl>
        <HStack>
          <InputGroup>
            <Input bg="white" onChange={(e) => inputHandler(e)} />
            <InputRightElement p="5px">
              <IconButton
                aria-label="Search database"
                icon={<Search2Icon />}
                size="sm"
                onClick={handleFilter}
              />
            </InputRightElement>
          </InputGroup>
          <Button onClick={handleFilter}>Найти</Button>
        </HStack>
      </FormControl>
    </Box>
  );
});
