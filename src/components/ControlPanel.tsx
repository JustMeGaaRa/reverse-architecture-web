import { FC, PropsWithChildren } from "react";
import { Stack, StackDivider } from "@chakra-ui/react";

export interface IControlPanelProps {
    direction: "column" | "row";
    divider?: boolean;
    padding?: number;
}

export const ControlPanel: FC<PropsWithChildren<IControlPanelProps>> = (props) => {
    return (
        <Stack
            align={"center"}
            background={"white"}
            boxShadow={"lg"}
            borderRadius={"md"}
            direction={props.direction}
            divider={props.divider && <StackDivider borderColor={"gray.200"} />}
            gap={2}
            padding={props.padding || 2}
        >
            {props.children}
        </Stack>
    )
}