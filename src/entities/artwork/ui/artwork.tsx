import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Badge,
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
  console.log(description);

  return (
    <Card minW="100%">
      <CardBody>
        <HStack>
          <Image src={imageUrl} width="20%" alt={`${title} image`} />
          <VStack alignItems="flex-start">
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            <HStack>
              {categories.map(({ id, name }) => (
                <Badge key={id}>{name}</Badge>
              ))}
            </HStack>
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
