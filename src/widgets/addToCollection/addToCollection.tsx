import {
  Button,
  Checkbox,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { ICollectionsModal } from "./addToCollection.types";
import { ICollection, collectionsAPI } from "shared";
import { useParams } from "react-router-dom";

export const AddToCollection: FC<ICollectionsModal> = ({ isOpen, onClose }) => {
  const { artwokID } = useParams();
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [checkedCollections, setCheckedCollections] = useState<boolean[]>([]);
  const handleGetPersonalCollections = async () => {
    const [error, data] = await collectionsAPI.getPersonalCollections({});
    if (!error) {
      setCollections(data.items);
      setCheckedCollections(data.items.map(() => false));
    }
  };
  const handleClickCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheckedCollections([
      ...checkedCollections.slice(0, index),
      e.target.checked,
      ...checkedCollections.slice(index + 1),
    ]);
  };
  const handleAddArtworkToCollections = () => {
    collections.forEach(async (collection, index) => {
      if (checkedCollections[index]) {
        console.log(collection.name);

        if (artwokID) {
          const [error, data] = await collectionsAPI.addArtworkToCollection(
            collection.id,
            artwokID
          );
          if (!error) {
            console.log(data);
          }
        }
      }
    });
  };
  useEffect(() => {
    handleGetPersonalCollections();
  }, []);
  useEffect(() => {
    console.log(collections);
  }, [checkedCollections]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize="xl">Добавить произведение в коллекцию</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {collections.map((collection, index) => (
            <HStack key={collection.id} alignItems="center">
              <Checkbox
                isChecked={checkedCollections[index]}
                onChange={(e) => handleClickCheck(e, index)}
              />
              <Text fontSize="xl">{collection.name}</Text>
            </HStack>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddArtworkToCollections}>Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
