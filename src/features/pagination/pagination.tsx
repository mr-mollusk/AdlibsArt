import { Button, Center, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "widgets/artworksList/context";

export const Pagination: FC = observer(() => {
  const { totalPages } = useStore(store => store);
  const changePage = useStore(store => store.changePage.bind(store));
  const pagesArray = Array.from(Array(totalPages + 1).keys()).slice(1);

  return (
    <Center w="100%">
      <HStack>
        {pagesArray.map((page) => (
          <Button key={page} onClick={() => changePage(page)}>
            {page}
          </Button>
        ))}
      </HStack>
    </Center>
  );
});
