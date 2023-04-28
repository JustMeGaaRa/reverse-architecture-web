import {
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import {
    ToolbalSection,
    Toolbar,
    useWorkspaceStore
} from "@reversearchitecture/workspace-viewer";
import saveAs from "file-saver";
import { Download, HelpCircle } from "iconoir-react";
import { FC } from "react";
import { HomeButton, SharePopover } from "../../components";
import { UsersOnline } from "../../containers";
import {
    exportToDrawio,
    exportToJson,
    exportToStructurizrDsl,
    exportToStructurizrJson
} from "./export";
import { useShare } from "./hooks";

export const ActivityPanel: FC<{
    
}> = ({
    
}) => {
    const { workspace } = useWorkspaceStore();
    const { link, clipboardCopy } = useShare();
    const { toObject } = useReactFlow();

    const exports = [
        {
            title: "Drawio (*.drawio)",
            command: "Ctrl + E + 1",
            onClick: () => saveAs(exportToDrawio(workspace))
        },
        {
            title: "Structurizr DSL (*.dsl)",
            command: "Ctrl + E + 2",
            onClick: () => saveAs(exportToStructurizrDsl(workspace))
        },
        {
            title: "Structurizr JSON (*.json)",
            command: "Ctrl + E + 3",
            onClick: () => saveAs(exportToStructurizrJson(workspace))
        },
        {
            title: "React Flow (*.json)",
            command: "Ctrl + E + 4",
            onClick: () => saveAs(exportToJson(workspace, toObject()))
        }
    ];

    return (
        <HStack>
            
            <Toolbar>
                <UsersOnline />
            </Toolbar>

            <Toolbar>
                <ToolbalSection>
                    <HomeButton />
                    <SharePopover link={link} onCopy={clipboardCopy} />
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<Download />}
                            title={"export"}
                        />
                        <MenuList>
                            {exports.map(item => (
                                <MenuItem
                                    key={item.title}
                                    command={item.command}
                                    onClick={item.onClick}
                                >
                                    {item.title}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <IconButton
                        aria-label={"Help"}
                        icon={<HelpCircle />}
                        title={"Help"}
                    />
                </ToolbalSection>
            </Toolbar>

        </HStack>
    );
}