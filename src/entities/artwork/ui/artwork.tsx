import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Wrap,
  Tag,
  CardHeader,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FC } from "react";
import { IArtwork } from "..";
import { DeleteIcon } from "@chakra-ui/icons";
import { collectionsAPI } from "shared";
import { useParams } from "react-router-dom";

export type IDeleteCard = { deleteButton?: boolean };

const Artwork: FC<IArtwork & IDeleteCard> = ({
  id,
  title,
  description,
  imageUrl,
  authors,
  categories,
  deleteButton = false,
}) => {
  const { collectionID } = useParams();
  const deleteHandler = async () => {
    if (collectionID) {
      const [error] = await collectionsAPI.deleteArtworkFromCollection(
        collectionID,
        id
      );
      if (!error) console.log(1);
      
    }
  };
  return (
    <Card minW="100%" bg="cyan.100">
      {deleteButton && (
        <CardHeader>
          <Flex justifyContent="flex-end">
            <IconButton aria-label={""} onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
          </Flex>
        </CardHeader>
      )}
      <CardBody>
        <HStack>
          <Image
            src={imageUrl}
            alignSelf="flex-start"
            width="20%"
            alt={`${title} image`}
          />
          <VStack alignItems="flex-start" w="80%">
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            <Wrap>
              {categories.map(({ id, name }) => (
                <Tag colorScheme="purple" key={id}>
                  {name}
                </Tag>
              ))}
            </Wrap>
            <Wrap>
              <Text>Авторы:</Text>
              {authors.map(({ id, name }) => (
                <Text key={id}>{name}</Text>
              ))}
            </Wrap>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default Artwork;
