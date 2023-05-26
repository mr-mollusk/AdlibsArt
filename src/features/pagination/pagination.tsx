import { Button, Center, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "widgets/artworksList/context";

export const Pagination: FC = observer(() => {
  const { totalPages, pageIndex } = useStore((store) => store);
  const changePage = useStore((store) => store.changePage.bind(store));
  const pagesArray = Array.from(Array(totalPages + 1).keys()).slice(1);

  return (
    <Center w="100%">
      <HStack>
        {pagesArray.length <= 5 ? (
          pagesArray.map((page) => (
            <Button key={page} onClick={() => changePage(page)}>
              {page}
            </Button>
          ))
        ) : (
          <HStack>
            <Button
              isDisabled={pageIndex === 1}
              w="50px"
              onClick={() => {
                changePage(1);
              }}
            >
              {"<<"}
            </Button>
            <Button
              isDisabled={pageIndex === 1}
              w="50px"
              onClick={() => {
                changePage(pageIndex - 1);
              }}
            >
              {"<"}
            </Button>
            {pageIndex !== 1 && pageIndex !== totalPages && (
              <Button w="50px" onClick={() => changePage(pageIndex - 1)}>
                {pageIndex - 1}
              </Button>
            )}
            <Button w="50px" onClick={() => changePage(pageIndex)}>
              {pageIndex}
            </Button>
            {pageIndex !== 1 && pageIndex !== totalPages && (
              <Button
                w="50px"
                mb="20px"
                onClick={() => changePage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Button>
            )}
            <Button
              w="50px"
              isDisabled={pageIndex === totalPages}
              onClick={() => {
                changePage(pageIndex + 1);
              }}
            >
              {">"}
            </Button>
            <Button
              isDisabled={pageIndex === totalPages}
              w="50px"
              onClick={() => {
                changePage(totalPages);
              }}
            >
              {">>"}
            </Button>
          </HStack>
        )}
      </HStack>
    </Center>
  );
});
