import { FC, PropsWithChildren } from "react";
import { Box, BoxProps, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react";

type PanelDockPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "left-center"
    | "right-center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

function getDockStyle(position: PanelDockPosition): BoxProps {
    switch (position) {
        case "top-left":
            return {
                position: "absolute",
                top: "0px",
                left: "0px"
            };
        case "top-center":
            return {
                position: "absolute",
                top: "0px",
                left: "50%",
                transform: "translate(-50%, 0)"
            };
        case "top-right":
            return {
                position: "absolute",
                top: "0px",
                right: "0px"
            };
        case "left-center":
            return {
                position: "absolute",
                top: "50%",
                left: "0px",
                transform: "translate(0, -50%)"
            };
        case "right-center":
            return {
                position: "absolute",
                top: "50%",
                right: "0px",
                transform: "translate(0, -50%)"
            };
        case "bottom-left":
            return {
                position: "absolute",
                bottom: "0px",
                left: "0px"
            };
        case "bottom-center":
            return {
                position: "absolute",
                bottom: "0px",
                left: "50%",
                transform: "translate(-50%, 0)"
            };
        case "bottom-right":
            return {
                position: "absolute",
                bottom: "0px",
                right: "0px"
            };
    }
}

export type PanelProps = HTMLChakraProps<"div"> & {
    dock: PanelDockPosition;
};

export const Panel: FC<PropsWithChildren<PanelProps>> = (props) => {
    return (
        <Box
            background={useColorModeValue("whiteAlpha.900", "gray.900")}
            borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.100")}
            borderWidth={1}
            borderRadius={"md"}
            margin={15}
            shadow={"lg"}
            zIndex={9}
            {...getDockStyle(props.dock)}
            {...props}
        >
            {props.children}
        </Box>
    );
}
