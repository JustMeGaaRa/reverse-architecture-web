import {
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { FC } from "react";

export const ColorInputControl: FC<{
    name: string;
    value: string;
    isRequired?: boolean;
}> = ({
    name,
    value,
}) => {
    return (
        <FormControl>
            <FormLabel>{name}</FormLabel>
            <Input type={"color"} defaultValue={value} />
        </FormControl>
    )
}