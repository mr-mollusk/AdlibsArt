import { Button, Center, HStack } from "@chakra-ui/react";
import { IArtwork } from "entities";
import { FC } from "react";

interface IPagination {
  pageIndex?: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setArtworks: React.Dispatch<React.SetStateAction<IArtwork[]>>;
}

export const Pagination: FC<IPagination> = ({
  totalPages,
  setPage,
  setArtworks,
}) => {
  const arr = Array.from(Array(totalPages + 1).keys()).slice(1);
  const paginationHandler = (newPageIndex: number) => {
    console.log(1);

    setPage(newPageIndex);
    fetch(
      `https://25.39.246.253:50443/api/artworks/search?pageIndex=${newPageIndex}&pageSize=10`
    )
      .then((result) => result.json())
      .then((data) => {
        setArtworks(data.artworks);
      });
  };
  return (
    <Center>
      <HStack>
        {arr.map((p) => (
          <Button
            onClick={() => paginationHandler(p)}
            key={`pagination_page_${p}`}
          >
            {p}
          </Button>
        ))}
      </HStack>
    </Center>
  );
};
