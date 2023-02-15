import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import { FC } from "react";

export const NumberInputControl: FC<{
    name: string;
    value: number;
    min?: number;
    max?: number;
    isRequired?: boolean;
}> = ({
    name,
    value,
    min,
    max,
    isRequired
}) => {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{name}</FormLabel>
            <NumberInput defaultValue={value} min={min} max={max}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    )
}