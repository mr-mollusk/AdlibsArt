import {
  Box,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, ComponentProps, ChangeEventHandler, useRef } from "react";

export interface IAutoCompleteElement {
  value: string;
  render?: ReactNode;
}

export interface IAutoComplete
  extends Omit<ComponentProps<"input">, "size" | "onSelect"> {
  options: IAutoCompleteElement[];
  onSelect: (element: IAutoCompleteElement) => void;
}

export const AutoComplete = ({
  options,
  onSelect,
  onChange,
  ...props
}: IAutoComplete) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOptionSelect = (value: IAutoCompleteElement) => () => {
    onSelect(value);
    onClose();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isOpen) {
      onOpen();
    }
    onChange?.(event);
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef}>
      <PopoverTrigger>
        <Input onChange={handleChange} ref={inputRef} {...props} />
      </PopoverTrigger>
      <PopoverContent>
        {options.map((option) => (
          <Box
            role="button"
            key={option.value}
            onClick={handleOptionSelect(option)}
          >
            {option.render || option.value}
          </Box>
        ))}
      </PopoverContent>
    </Popover>
  );
};
