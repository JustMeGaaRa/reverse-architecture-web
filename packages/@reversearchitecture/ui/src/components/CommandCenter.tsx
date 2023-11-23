import {
    Button,
    Icon,
    IconButton,
    Input,
    InputGroup, InputLeftElement, InputRightElement
} from "@chakra-ui/react";
import {
    Search as SearchIcon,
    Terminal
} from "iconoir-react";
import { FC } from "react";

export const CommandCenter: FC = () => {
    return (
        <InputGroup size={"md"} variant={"filled"}>
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
    )
}