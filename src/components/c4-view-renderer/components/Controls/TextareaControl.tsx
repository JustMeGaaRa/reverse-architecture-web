import {
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react";
import { FC } from "react";

export const TextareaControl: FC<{
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
            <Textarea
                placeholder={placeholder}
                value={value}
                // onChange={(event) => setNodeChanges({ description: event.target.value })}
            />
        </FormControl>
    )
}