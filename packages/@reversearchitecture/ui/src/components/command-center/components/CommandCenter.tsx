import {
    Box,
    Highlight,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    EmojiSad,
    Search as SearchIcon,
    Terminal,
} from "iconoir-react";
import { FC, useRef } from "react";
import {
    SearchDropdown,
    SearchEmpty,
    SearchOverlay,
    SearchResultGroup
} from "../components";
import { SearchGroupResult } from "../types";

export const CommandCenter: FC<{
    isLoading?: boolean;
    searchResults?: SearchGroupResult[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    isLoading,
    searchResults,
    onChange
}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box position={"relative"}>
            <SearchOverlay isOpen={isOpen} />
            <InputGroup size={"md"} variant={"filled"} zIndex={1000}>
                <InputLeftElement>
                    <Icon as={SearchIcon} color={"gray.500"} boxSize={6} />
                </InputLeftElement>
                <Input
                    ref={searchRef}
                    backgroundColor={"surface.tinted-black-40"}
                    borderRadius={16}
                    type={"search"}
                    placeholder={"Type \"/\" to search commands"}
                    _placeholder={{
                        color: "gray.500"
                    }}
                    onFocus={onOpen}
                    onBlur={onClose}
                    onChange={onChange}
                />
                <InputRightElement>
                    <IconButton
                        aria-label={"command center"}
                        icon={<Icon as={Terminal} boxSize={6} />}
                        size={"sm"}
                        variant={"tonal"}
                        title={"command center"}
                    />
                </InputRightElement>
            </InputGroup>
            <SearchDropdown isOpen={isOpen}>
                {searchResults?.map((searchGroup, index) => (
                    <SearchResultGroup
                        key={index}
                        section={searchGroup.title}
                        total={searchGroup.results.length}
                    >
                        {searchGroup.results.map((searchItem) => (
                            <>
                                <Icon as={searchItem.icon} />
                                <Text marginX={2}>
                                    <Highlight
                                        query={searchRef?.current.value.split(" ")}
                                        styles={{ backgroundColor: "lime.400" }}
                                    >
                                        {searchItem.text}
                                    </Highlight>
                                </Text>
                            </>
                        ))}
                    </SearchResultGroup>
                ))}
                {searchResults?.length === 0 && (
                    <SearchEmpty query={searchRef?.current?.value} />
                )}
            </SearchDropdown>
        </Box>
    )
}