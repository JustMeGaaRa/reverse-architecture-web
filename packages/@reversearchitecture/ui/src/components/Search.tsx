import {
    Input,
    InputGroup, InputLeftElement, InputRightElement
} from "@chakra-ui/react";
import {
    Search as SearchIcon
} from "iconoir-react";
import { FC } from "react";
import { Shortcut } from "./Shortcut";

export const Search: FC<{

}> = ({
}) => {
    return (
        <InputGroup width={"xl"} variant={"filled"}>
            <InputLeftElement
                pointerEvents={"none"}
            >
                <SearchIcon />
            </InputLeftElement>
            <Input
                borderRadius={"16px"}
                type={"search"}
                placeholder={"What are you looking for?"}
            />
            <InputRightElement width={"auto"} right={2}>
                <Shortcut keys={["CTRL", "F"]} />
            </InputRightElement>
        </InputGroup>
    )
}