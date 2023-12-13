import { Box, ChakraProps } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const BorderTop: FC<PropsWithChildren<ChakraProps & { className?: string }>> = (props) => {
    return (
        <Box
            {...props}
            className={props.className ? `${props.className} reverse__border-top` : "reverse__border-top"}
            background={"linear-gradient(rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.001))"}
        >
            {props.children}
        </Box>
    )
}