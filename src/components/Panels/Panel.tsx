import { FC, PropsWithChildren } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export type ControlPanelProps = unknown;

export const ControlPanel: FC<PropsWithChildren<ControlPanelProps>> = (props) => {
    return (
        <Flex
            alignItems={"center"}
            background={useColorModeValue("whiteAlpha.900", "rgba(31, 33, 35, 0.9)")}
            borderColor={useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.1)")}
            borderWidth={1}
            borderRadius={16}
            backdropFilter={"blur(8px)"}
            height={"64px"}
            padding={"8px"}
        >
            {props.children}
        </Flex>
    );
}