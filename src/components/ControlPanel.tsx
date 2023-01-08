import { FC, PropsWithChildren } from "react";
import { Stack, StackDivider, useColorModeValue } from "@chakra-ui/react";

export interface IControlPanelProps {
    direction: "column" | "row";
    divider?: boolean;
    padding?: number;
}

export const ControlPanel: FC<PropsWithChildren<IControlPanelProps>> = (props) => {
    const background = useColorModeValue("white.900", "gray.900");
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");

    return (
        <Stack
            align={"center"}
            background={background}
            boxShadow={"lg"}
            borderRadius={"md"}
            direction={props.direction}
            divider={props.divider && <StackDivider borderColor={dividerBorderColor} />}
            gap={2}
            padding={props.padding || 2}
        >
            {props.children}
        </Stack>
    )
}