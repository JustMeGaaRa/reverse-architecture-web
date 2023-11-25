import {
    Box,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Portal,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    Page,
    Search as SearchIcon,
    Terminal,
    TerminalTag
} from "iconoir-react";
import { FC } from "react";
import { SearchDropdown, SearchResultGroup } from "../components";

export const CommandCenter: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box position={"relative"}>
            <Portal>
                <Box
                    backgroundColor={"surface.tinted-black-60"}
                    height={"100vh"}
                    width={"100vw"}
                    position={"absolute"}
                    left={0}
                    top={0}
                    display={isOpen ? "block" : "none"}
                    zIndex={9}
                />
            </Portal>
            <InputGroup size={"md"} variant={"filled"} zIndex={10}>
                <InputLeftElement>
                    <Icon as={SearchIcon} color={"gray.500"} boxSize={6} />
                </InputLeftElement>
                <Input
                    backgroundColor={"surface.tinted-black-40"}
                    borderRadius={16}
                    type={"search"}
                    placeholder={"Type \"/\" to search commands"}
                    _placeholder={{
                        color: "gray.500"
                    }}
                    onFocus={onOpen}
                    onBlur={onClose}
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
                <SearchResultGroup section={"Community"}>
                    <><Icon as={Page} /><Text marginX={2}>Account management</Text></>
                    <><Icon as={Page} /><Text marginX={2}>Internet Banking Application</Text></>
                    <><Icon as={Page} /><Text marginX={2}>GDPR Compliance</Text></>
                </SearchResultGroup>
                <SearchResultGroup section={"Workspaces"}>
                    <><Icon as={Page} /><Text marginX={2}>Account management</Text></>
                    <><Icon as={Page} /><Text marginX={2}>Internet Banking Application</Text></>
                    <><Icon as={Page} /><Text marginX={2}>GDPR Compliance</Text></>
                </SearchResultGroup>
                <SearchResultGroup section={"Commands"}>
                    <><Icon as={TerminalTag} /><Text marginX={2}>Account management</Text></>
                    <><Icon as={TerminalTag} /><Text marginX={2}>Internet Banking Application</Text></>
                    <><Icon as={TerminalTag} /><Text marginX={2}>GDPR Compliance</Text></>
                </SearchResultGroup>
            </SearchDropdown>
        </Box>
    )
}