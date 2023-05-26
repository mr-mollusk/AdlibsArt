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
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useStore } from "widgets/artworksList/context";

export const Search: FC = observer(() => {
  const [search, setSearch] = useState("");
  const filterData = useStore((store) => store.filterPage.bind(store));
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
                onClick={() => filterData(search)}
              />
            </InputRightElement>
          </InputGroup>
          <Button onClick={() => filterData(search)}>Найти</Button>
        </HStack>
      </FormControl>
    </Box>
  );
});