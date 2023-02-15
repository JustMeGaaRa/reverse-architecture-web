import {
    FormControl,
    FormLabel,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack
} from "@chakra-ui/react";
import { FC } from "react";

export const SliderInputControl: FC<{
    name: string;
    value: number;
    isRequired?: boolean;
    min?: number;
    max?: number;
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
            <Slider mb={5} defaultValue={value} min={min} max={max}>
                <SliderMark value={min}>
                    {min}
                </SliderMark>
                <SliderMark transform={"translate(-100%, 0)"} value={max}>
                    {max}
                </SliderMark>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </FormControl>
    )
}