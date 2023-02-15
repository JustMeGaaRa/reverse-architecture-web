import {
    FormControl,
    FormLabel,
    Select
} from "@chakra-ui/react";
import { FC } from "react";

export const SelectInputControl: FC<{
    placeholder?: string;
    name: string;
    value: string | number;
    isRequired?: boolean;
    options: Array<{ value: string, name: string }>;
}> = ({
    placeholder,
    name,
    value,
    options,
    isRequired
}) => {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{name}</FormLabel>
            <Select
                placeholder={placeholder}
                defaultValue={value}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </Select>
        </FormControl>
    )
}