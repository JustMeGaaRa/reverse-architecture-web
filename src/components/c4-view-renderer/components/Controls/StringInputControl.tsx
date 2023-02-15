import {
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { FC } from "react";

export const StringInputControl: FC<{
    placeholder: string;
    name: string;
    value: string;
    isRequired?: boolean;
}> = ({
    placeholder,
    name,
    value,
    isRequired
}) => {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{name}</FormLabel>
            <Input placeholder={placeholder} value={value} />
        </FormControl>
    )
}