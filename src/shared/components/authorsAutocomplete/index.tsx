import { useState, useEffect, useMemo, ChangeEventHandler } from "react";
import { AuthorsRequest, IAuthors, authorsAPI } from "shared";
import useDebouncedFunction from "shared/hooks/debounce";
import { AutoComplete, IAutoComplete } from "../autocomplete";

const defaultOptions: AuthorsRequest = {
  pageSize: 10,
};

export interface IAuthorsAutocomplete
  extends Omit<IAutoComplete, "value" | "onChange" | "options" | 'onSelect'> {
  value?: IAuthors;
  onChange: (value: IAuthorsAutocomplete["value"]) => void;
  options?: AuthorsRequest;
}

export const AuthorsAutocomplete = ({
  value,
  onChange,
  options: requestOptions = {},
  ...rest
}: IAuthorsAutocomplete) => {
  const [options, setOptions] = useState<IAuthors[]>([]);
  const [searchValue, setSearchValue] = useState(value?.name || "");

  const handleAuthors = async (authorName: string) => {
    const [error, data] = await authorsAPI.getAuthors({
      ...config,
      authorName,
    });
    if (!error) {
      setOptions(data.items);
    }
  };

  const debounceSearch = useDebouncedFunction(handleAuthors);

  const config = useMemo(
    () => ({ ...defaultOptions, ...requestOptions }),
    [requestOptions]
  );

  useEffect(() => {
    handleAuthors(value?.name || "");
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    debounceSearch(value);
  };

  const authorOptions: IAutoComplete["options"] = useMemo(
    () => options.map((author) => ({ value: author.id, render: author.name })),
    [options]
  );

  const handleOptionSelect: IAutoComplete["onSelect"] = (author) => {
    const selectedOption = options.find((option) => option.id === author.value);
    if (selectedOption) {
      onChange(selectedOption);
      setSearchValue(selectedOption.name);
    }
  };

  return (
    <AutoComplete
      value={searchValue}
      onChange={handleInputChange}
      options={authorOptions}
      {...rest}
      onSelect={handleOptionSelect}
    />
  );
};
