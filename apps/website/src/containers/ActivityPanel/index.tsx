import {
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { Panel, useReactFlow } from "@reactflow/core";
import {
    ToolbarSection,
    Toolbar,
    useWorkspaceStore
} from "@reversearchitecture/workspace-viewer";
import { Download, HelpCircle } from "iconoir-react";
import { FC } from "react";
import { HomeButton, SharePopover } from "../../components";
import { UsersOnline } from "../../containers";
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
            onClick: () => {}
        },
        {
            title: "Structurizr DSL (*.dsl)",
            command: "Ctrl + E + 2",
            onClick: () => {}
        },
        {
            title: "Structurizr JSON (*.json)",
            command: "Ctrl + E + 3",
            onClick: () => {}
        },
        {
            title: "React Flow (*.json)",
            command: "Ctrl + E + 4",
            onClick: () => {}
        }
    ];

    return (
        <Panel position={"top-right"}>
            <HStack>
                
                <Toolbar>
                    <UsersOnline />
                </Toolbar>

                <Toolbar>
                    <ToolbarSection>
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
                    </ToolbarSection>
                </Toolbar>

            </HStack>
        </Panel>
    );
}