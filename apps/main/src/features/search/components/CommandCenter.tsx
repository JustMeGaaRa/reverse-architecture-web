import {
    Box,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
} from "@chakra-ui/react";
import {
    SearchDropdown,
    SearchNoResultsMessage,
    SearchOverlay,
    SearchResultGroup,
    SearchResultItem,
    SearchGroupResult,
    useLocale,
    NoContentBoundary
} from "@reversearchitecture/ui";
import {
    Search as SearchIcon,
    Terminal,
    Xmark,
} from "iconoir-react";
import { FC, useCallback, useRef, useState } from "react";
import { LocaleKeys } from "../../localization";
import { useSearch } from "../hooks";

export const CommandCenter: FC<{
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    onChange
}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ results, setResults ] = useState<SearchGroupResult[]>([]);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const { getLocalizedString } = useLocale();
    const { onSearch } = useSearch();

    const handleOnSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value)
            .then((results) => {
                setResults(results);
            })
            .catch((error) => {
                console.error(error);
            });
        onChange?.(event);
    }, [onChange, onSearch]);

    const handleOnSearchCommand = useCallback(() => {

    }, []);

    const handleOnSearchClear = useCallback(() => {
        if (searchRef?.current) {
            searchRef.current.value = null;
            searchRef.current.blur();
            onClose();
        }
    }, [onClose]);

    const handleOnSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "ArrowUp":
                setSelectedIndex(selectedIndex - 1);
                break;
            case "ArrowDown":
                setSelectedIndex(selectedIndex + 1);
                break;
            case "Enter":
            case "Escape":
                if (searchRef?.current) {
                    searchRef.current.value = null;
                    searchRef.current.blur();
                    onClose();
                }
                break;
        }
    }, [onClose, selectedIndex]);

    return (
        <Box position={"relative"}>
            <SearchOverlay isOpen={isOpen} />
            <InputGroup zIndex={1000}>
                <InputLeftElement>
                    <Icon as={SearchIcon} boxSize={6} />
                </InputLeftElement>
                <Input
                    ref={searchRef}
                    type={"search"}
                    placeholder={getLocalizedString(LocaleKeys.SEARCH_PLACEHOLDER)}
                    onFocus={onOpen}
                    // onBlur={onClose}
                    onChange={handleOnSearchChange}
                    onKeyDown={handleOnSearchKeyDown}
                />
                <InputRightElement>
                    {!isOpen ? (
                        <IconButton
                            aria-label={"command center"}
                            icon={<Icon as={Terminal} boxSize={6} />}
                            size={"sm"}
                            variant={"tonal"}
                            title={"command center"}
                            onClick={handleOnSearchCommand}
                        />
                    ) : (
                        <IconButton
                            aria-label={"clear search"}
                            icon={<Icon as={Xmark} boxSize={6} />}
                            size={"sm"}
                            variant={"tonal"}
                            title={"clear search"}
                            onClick={handleOnSearchClear}
                        />
                    )}
                </InputRightElement>
            </InputGroup>
            <SearchDropdown isOpen={isOpen}>
                <NoContentBoundary
                    condition={results?.length === 0}
                    fallback={(
                        <SearchNoResultsMessage
                            query={searchRef?.current?.value ?? ""}
                            title={getLocalizedString(LocaleKeys.SEARCH_NO_RESULTS_TITLE)}
                            description={getLocalizedString(LocaleKeys.SEARCH_NO_RESULTS_SUGGESTION)}
                        />
                    )}
                >
                    {results?.map((searchGroup, index) => (
                        <SearchResultGroup
                            key={index}
                            section={searchGroup.title}
                            total={searchGroup.results.length}
                        >
                            {searchGroup.results.map((searchItem, index) => (
                                <SearchResultItem
                                    key={`search-item.${index}`}
                                    icon={searchItem.icon}
                                    text={searchItem.text}
                                    query={searchRef?.current?.value}
                                />
                            ))}
                        </SearchResultGroup>
                    ))}
                </NoContentBoundary>
            </SearchDropdown>
        </Box>
    )
}