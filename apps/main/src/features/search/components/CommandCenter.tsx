import {
    Button,
    ButtonGroup,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
    SearchMenu,
    SearchMenuOverlay,
    SearchMenuList,
    SearchMenuTrigger,
    SearchMenuDivider,
    useLocale,
} from "@restruct/ui";
import {
    Search as SearchIcon,
    Terminal,
    Xmark,
} from "iconoir-react";
import { FC, useCallback, useRef, useState } from "react";
import { LocaleKeys } from "../../localization";
import {
    CommandCenterResultGroup,
    CommandCenterResultItem,
    SearchNoResultsMessage
} from "../components";
import {
    CommandSearchStrategy,
    CommunitySearchStrategy,
    SearchGroup,
    WorkspaceSearchStrategy
} from "../types";

export const CommandCenter: FC<{
    width?: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    width,
    onChange
}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { getLocalizedString } = useLocale();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isClearable, setIsClearable ] = useState(false);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ searchGroups, setSearchGroups ] = useState<SearchGroup[]>([]);

    const search = useCallback((query: string) => {
        const fetchSearchGroups = async (query: string) => {
            const communityResults = await new CommunitySearchStrategy().search(query.trim());
            const workspaceResults = await new WorkspaceSearchStrategy().search(query.trim());
            const commandsResults = await new CommandSearchStrategy().search(query.trim());

            return [
                communityResults,
                workspaceResults,
                commandsResults
            ]
        }

        fetchSearchGroups(query)
            .then(results => setSearchGroups(results))
            .catch((error) => console.error(error));
    }, []);

    const handleOnSearchFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        search(event.target.value);
        onOpen();
    }, [onOpen, search]);

    const handleOnSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setIsClearable(event.target.value.length > 0);
        search(event.target.value);
        onChange?.(event);
    }, [onChange, search]);

    const handleOnSearchCommand = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const handleOnSearchClear = useCallback(() => {
        if (searchRef?.current) {
            searchRef.current.value = null;
            searchRef.current.blur();
            setIsClearable(searchRef.current.value.length > 0);
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
        <SearchMenu isOpen={isOpen} onClose={onClose}>
            <SearchMenuOverlay />
            <SearchMenuTrigger>
                <InputGroup zIndex={1000}>
                    <InputLeftElement>
                        <Icon as={SearchIcon} boxSize={6} />
                    </InputLeftElement>
                    <Input
                        ref={searchRef}
                        placeholder={getLocalizedString(LocaleKeys.SEARCH_PLACEHOLDER)}
                        type={"search"}
                        width={width}
                        onFocus={handleOnSearchFocus}
                        onChange={handleOnSearchChange}
                        onKeyDown={handleOnSearchKeyDown}
                    />
                    <InputRightElement>
                        <ButtonGroup gap={0} spacing={1} size={"sm"}>
                            {isClearable && (
                                <IconButton
                                    aria-label={"clear search"}
                                    icon={<Icon as={Xmark} boxSize={6} />}
                                    size={"sm"}
                                    variant={"ghost"}
                                    title={"clear search"}
                                    onClick={handleOnSearchClear}
                                />
                            )}
                            <Button
                                aria-label={"command center"}
                                size={"sm"}
                                variant={"tonal"}
                                title={"command center"}
                                onClick={handleOnSearchCommand}
                            >
                                Press /
                            </Button>
                        </ButtonGroup>
                    </InputRightElement>
                </InputGroup>
            </SearchMenuTrigger>
            <SearchMenuList width={["sm", "md", "lg"]}>
                <VStack divider={<SearchMenuDivider />} width={"100%"}>
                    {searchGroups.filter(group => group.items.length > 0).map((searchGroup, index) => (
                        <CommandCenterResultGroup
                            key={`search-group.${index}`}
                            searchGroup={searchGroup}
                        >
                            {searchGroup.items.map((searchItem, index) => (
                                <CommandCenterResultItem
                                    key={`search-item.template.${index}`}
                                    searchItem={searchItem}
                                    query={searchRef?.current?.value ?? ""}
                                />
                            ))}
                        </CommandCenterResultGroup>
                    ))}
                </VStack>

                {searchGroups.every(x => x.items?.length === 0) && (
                    <SearchNoResultsMessage
                        query={searchRef?.current?.value ?? ""}
                        title={getLocalizedString(LocaleKeys.SEARCH_NO_RESULTS_TITLE)}
                        description={getLocalizedString(LocaleKeys.SEARCH_NO_RESULTS_SUGGESTION)}
                    />
                )}
            </SearchMenuList>
        </SearchMenu>
    )
}