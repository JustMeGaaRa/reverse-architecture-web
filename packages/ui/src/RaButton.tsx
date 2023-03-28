import {
    ButtonProps,
    Button,
    useColorModeValue
} from "@chakra-ui/react";
import { forwardRef } from "react";

type RaButtonProps = ButtonProps;

export const RaButton = forwardRef<HTMLButtonElement, RaButtonProps>((props, ref) => {
    return (
        <Button
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
        >
            {props.children}
        </Button>
    )
})

RaButton.displayName = "RaButton";