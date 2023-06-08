import { Button, Center, HStack } from "@chakra-ui/react";
import { useStore } from "app/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { IPagination } from "./pagination.types";

export const Pagination: FC<IPagination> = observer(({ paginationType }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const artworkStore = useStore((store) => store.artworksStore);
  const authorsStore = useStore((store) => store.authorsStore);
  const categoriesStore = useStore((store) => store.categoriesStore);
  const artworksChangePage = useStore((store) =>
    store.artworksStore.changePage.bind(store.artworksStore)
  );
  const authorsChangePage = useStore((store) =>
    store.authorsStore.changePage.bind(store.authorsStore)
  );
  const categoriesChangePage = useStore((store) =>
    store.categoriesStore.changePage.bind(store.categoriesStore)
  );
  const pagesArray = Array.from(Array(totalPages + 1).keys()).slice(1);

  useEffect(() => {
    switch (paginationType) {
      case "artworks": {
        setPageIndex(artworkStore.pageIndex);
        setTotalPages(artworkStore.totalPages);

        break;
      }
      case "authors": {
        setPageIndex(authorsStore.pageIndex);
        setTotalPages(authorsStore.totalPages);
        break;
      }
      case "categories": {
        setPageIndex(categoriesStore.pageIndex);
        setTotalPages(categoriesStore.totalPages);
        break;
      }
      default:
        break;
    }
  }, [artworkStore.artworks, authorsStore.authors, categoriesStore.categories]);
  const handleChangePage = (page: number) => {
    switch (paginationType) {
      case "artworks": {
        artworksChangePage(page);
        break;
      }
      case "authors": {
        authorsChangePage(page);
        break;
      }
      case "categories": {
        categoriesChangePage(page);
        break;
      }
      default:
        break;
    }
  };
  return (
    <Center w="100%">
      <HStack>
        {pagesArray.length <= 5 ? (
          pagesArray.map((page) => (
            <Button key={page} onClick={() => handleChangePage(page)}>
              {page}
            </Button>
          ))
        ) : (
          <HStack>
            <Button
              isDisabled={pageIndex === 1}
              w="50px"
              onClick={() => {
                handleChangePage(1);
              }}
            >
              {"<<"}
            </Button>
            <Button
              isDisabled={pageIndex === 1}
              w="50px"
              onClick={() => {
                handleChangePage(pageIndex - 1);
              }}
            >
              {"<"}
            </Button>
            {pageIndex !== 1 && pageIndex !== totalPages && (
              <Button w="50px" onClick={() => handleChangePage(pageIndex - 1)}>
                {pageIndex - 1}
              </Button>
            )}
            <Button w="50px" onClick={() => handleChangePage(pageIndex)}>
              {pageIndex}
            </Button>
            {pageIndex !== 1 && pageIndex !== totalPages && (
              <Button
                w="50px"
                mb="20px"
                onClick={() => handleChangePage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Button>
            )}
            <Button
              w="50px"
              isDisabled={pageIndex === totalPages}
              onClick={() => {
                handleChangePage(pageIndex + 1);
              }}
            >
              {">"}
            </Button>
            <Button
              isDisabled={pageIndex === totalPages}
              w="50px"
              onClick={() => {
                handleChangePage(totalPages);
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
