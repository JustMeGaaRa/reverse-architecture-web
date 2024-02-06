import {
    Highlight,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
    SearchMenu,
    SearchMenuOverlay,
    SearchMenuGroup,
    SearchMenuItem,
    SearchMenuList,
    SearchMenuTrigger,
    SearchMenuDivider,
    useLocale,
} from "@reversearchitecture/ui";
import {
    Page,
    Search as SearchIcon,
    Terminal,
    Xmark,
} from "iconoir-react";
import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LocaleKeys } from "../../localization";
import { CommandCenterResultGroup, CommandCenterResultItem, SearchNoResultsMessage } from "../components";
import {
    CommandSearchStrategy,
    CommunitySearchStrategy,
    ISearchStrategy,
    SearchItem,
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
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { getLocalizedString } = useLocale();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isClearable, setIsClearable ] = useState(false);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ workspaceResults, setWorkspaceResults ] = useState<SearchItem[]>([]);
    const [ communityResults, setCommunityResults ] = useState<SearchItem[]>([]);
    const [ commandsResults, setCommandsResults ] = useState<SearchItem[]>([]);

    const search = useCallback((query: string) => {
        const fetchSearchResults = async (strategy: ISearchStrategy, query: string) => {
            return strategy.search(query.trim())
                .then(results => {
                    return {
                        title: strategy.name,
                        results: results
                    }
                })
                .catch(error => {
                    return {
                        title: strategy.name,
                        results: []
                    }
                })              
        }

        fetchSearchResults(new CommunitySearchStrategy(), query)
            .then(results => setCommunityResults(results.results))
            .catch((error) => console.error(error));
        
        fetchSearchResults(new WorkspaceSearchStrategy(), query)
            .then(results => setWorkspaceResults(results.results))
            .catch((error) => console.error(error));
        
        fetchSearchResults(new CommandSearchStrategy(), query)
            .then(results => setCommandsResults(results.results))
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

    const handleOnSearchItemTemplateClick = useCallback(() => {
        navigate(`/community/preview=?${"big-bank-plc"}`);
        onClose();
    }, [navigate, onClose]);

    const handleOnSearchItemWorkspaceClick = useCallback(() => {
        navigate(`/workspace/${"big-bank-plc"}`);
        onClose();
    }, [navigate, onClose]);

    const handleOnSearchItemCommandClick = useCallback(() => {
        console.log("item clicked");
        onClose();
    }, [onClose]);

    const handleOnSearchGroupCommunityClick = useCallback(() => {
        navigate("/community");
        onClose();
    }, [navigate, onClose]);

    const handleOnSearchGroupWorkspacesClick = useCallback(() => {
        navigate("/workspaces");
        onClose();
    }, [navigate, onClose]);

    const handleOnSearchGroupCommandsClick = useCallback(() => {
        setSearchParams(params => {
            params.set("help", "commands");
            return new URLSearchParams(params);
        })
        onClose();
    }, [setSearchParams, onClose]);

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
                        {!isClearable && !isOpen ? (
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
            </SearchMenuTrigger>
            <SearchMenuList width={["sm", "md", "lg"]}>
                <VStack divider={<SearchMenuDivider />} width={"100%"}>
                    {commandsResults.length > 0 && (
                        <CommandCenterResultGroup
                            title={`Community (${communityResults.length})`}
                            onClick={handleOnSearchGroupCommunityClick}
                        >
                            {communityResults.map((searchItem, index) => (
                                <CommandCenterResultItem
                                    key={`search-item.template.${index}`}
                                    icon={Page}
                                    query={searchRef?.current?.value ?? ""}
                                    title={searchItem.text}
                                    onClick={handleOnSearchItemTemplateClick}
                                />
                            ))}
                        </CommandCenterResultGroup>
                    )}
                
                    {workspaceResults.length > 0 && (
                        <CommandCenterResultGroup
                            title={`Workspaces (${workspaceResults.length})`}
                            onClick={handleOnSearchGroupWorkspacesClick}
                        >
                            {workspaceResults.map((searchItem, index) => (
                                <CommandCenterResultItem
                                    key={`search-item.workspace.${index}`}
                                    icon={Page}
                                    query={searchRef?.current?.value ?? ""}
                                    title={searchItem.text}
                                    onClick={handleOnSearchItemWorkspaceClick}
                                />
                            ))}
                        </CommandCenterResultGroup>
                    )}
                
                    {commandsResults.length > 0 && (
                        <CommandCenterResultGroup
                            title={`Commands (${commandsResults.length})`}
                            onClick={handleOnSearchGroupCommandsClick}
                        >
                            {commandsResults.map((searchItem, index) => (
                                <CommandCenterResultItem
                                    key={`search-item.command.${index}`}
                                    icon={Page}
                                    query={searchRef?.current?.value ?? ""}
                                    title={searchItem.text}
                                    onClick={handleOnSearchItemCommandClick}
                                />
                            ))}
                        </CommandCenterResultGroup>
                    )}
                </VStack>

                {workspaceResults?.length === 0 && commandsResults.length === 0 && commandsResults.length === 0 && (
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