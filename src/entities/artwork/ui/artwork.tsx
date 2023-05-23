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
} from "@chakra-ui/react";
import { FC } from "react";
import { IArtwork } from "..";

export const Artwork: FC<IArtwork> = ({
  title,
  description,
  imageUrl,
  authors,
  categories,
}) => {

  return (
    <Card minW="100%" bg="cyan.100">
      <CardBody>
        <HStack>
          <Image src={imageUrl} width="20%" alt={`${title} image`} />
          <VStack alignItems="flex-start">
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            <Wrap>
              {categories.map(({ id, name }) => (
                <Tag colorScheme="purple" key={id}>
                  {name}
                </Tag>
              ))}
            </Wrap>
            <HStack>
              <Text>Авторы:</Text>
              {authors.map(({ id, name }) => (
                <Text key={id}>{name}</Text>
              ))}
            </HStack>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};
