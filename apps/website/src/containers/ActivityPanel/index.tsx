import {
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { Panel, useReactFlow } from "@reactflow/core";
import { Download, HelpCircle } from "iconoir-react";
import { FC } from "react";
import { HomeButton, SharePopover } from "../../components";
import { UsersOnline } from "../../containers";
import { useShare } from "./hooks";

export const ActivityPanel: FC<{
    
}> = ({
    
}) => {

    return (
        <Panel position={"top-right"}>
            <HStack>

            </HStack>
        </Panel>
    );
}