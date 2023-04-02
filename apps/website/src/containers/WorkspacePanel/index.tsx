import {
    Box,
    HStack,
    StackDivider,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    IconButton
} from "@chakra-ui/react";
import { useWorkspace } from "@justmegaara/structurizr-dsl";
import { Panel, useReactFlow } from "@reactflow/core";
import { Download, Settings } from "iconoir-react";
import { FC } from "react";
import saveAs from "file-saver";
import {
    ControlPanel,
    HomeButton,
    SharePopover,
    TitleEditable
} from "../../components";
import { useShare } from "./hooks";
import {
    exportToDrawio,
    exportToJson,
    exportToStructurizrDsl,
    exportToStructurizrJson
} from "./export";

export type WorkspacePanelProps = unknown;

export const WorkspacePanel: FC<WorkspacePanelProps> = () => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    
    const { workspace, setName } = useWorkspace();
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
        <Panel position={"top-left"}>
            <ControlPanel>
                <HStack divider={<StackDivider borderColor={dividerBorderColor} />}>

                    <Box px={2}>
                        <HomeButton />
                    </Box>
                    
                    <TitleEditable
                        title={workspace?.name ?? "Workspace"}
                        onTitleChange={setName}
                    />
                    
                    <HStack gap={2} px={2}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                title={"settings"}
                                icon={<Settings />}
                            />
                            <MenuList>
                                {[].map(item => (
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
                        <SharePopover link={link} onCopy={clipboardCopy} />
                    </HStack>
                    
                    <Box px={2}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                title={"export"}
                                icon={<Download />}
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
                    </Box>

                </HStack>
            </ControlPanel>
        </Panel>
    );
}