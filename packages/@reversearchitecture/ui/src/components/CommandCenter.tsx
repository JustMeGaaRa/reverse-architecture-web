import {
    Button,
    Icon,
    IconButton,
    Input,
    InputGroup, InputLeftElement, InputRightElement
} from "@chakra-ui/react";
import {
    Search as SearchIcon, Terminal
} from "iconoir-react";
import { FC } from "react";

export const CommandCenter: FC = () => {
    return (
        <InputGroup size={"md"} variant={"filled"}>
            <InputLeftElement>
                <Icon as={SearchIcon} color={"gray.500"} boxSize={"24px"} />
            </InputLeftElement>
            <Input
                borderRadius={16}
                backgroundColor={"surface.tinted-black-40"}
                type={"search"}
                placeholder={"Type \"/\" to search commands"}
                _placeholder={{
                    color: "gray.500"
                }}
            />
            <InputRightElement>
                <IconButton
                    aria-label={"command center"}
                    icon={<Icon as={Terminal} boxSize={"24px"} />}
                    size={"sm"}
                    variant={"tonal"}
                    title={"command center"}
                />
            </InputRightElement>
        </InputGroup>
    )
}