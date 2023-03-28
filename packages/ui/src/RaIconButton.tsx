import {
    IconButtonProps,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react";
import { forwardRef } from "react";

type RaIconButtonProps = IconButtonProps;

export const RaIconButton = forwardRef<HTMLButtonElement, RaIconButtonProps>((props, ref) => {
    return (
        <IconButton
            ref={ref}
            {...props}
            variant={"ghost"}
            _hover={{
                backgroundColor: useColorModeValue("gray.100", "#3F4614"),
                color: useColorModeValue("gray.800", "#E5FF00"),
            }}
            _active={{
                color: useColorModeValue("gray.800", "#E5FF00"),
            }}
        />
    )
})

RaIconButton.displayName = "RaIconButton";