import { Box, HStack, StackDivider, useColorModeValue } from "@chakra-ui/react";
import { Panel } from "@reactflow/core";
import { FC } from "react";
import { HomeSimple } from "iconoir-react";
import {
    TitleEditable,
    ToolbarIconButton,
    ExportMenu,
    SharePopover,
    SettingsMenu
} from "..";
import { useWorkspace } from "../../dsl";
import { useShare, useExports } from "../";
import { ControlPanel } from "./Panel";

export type WorkspacePanelProps = unknown;

export const WorkspacePanel: FC<WorkspacePanelProps> = () => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    
    const { workspace, setName } = useWorkspace();
    const { exports } = useExports();
    const { link, clipboardCopy } = useShare();

    return (
        <Panel position={"top-left"}>
            <ControlPanel>
                <HStack divider={<StackDivider borderColor={dividerBorderColor} />}>

                    <Box px={2}>
                        <ToolbarIconButton
                            aria-label={"Home"}
                            title={"Home"}
                            icon={<HomeSimple />}
                        />
                    </Box>
                    
                    <TitleEditable title={workspace?.name ?? "Workspace"} onTitleChange={setName} />
                    
                    <HStack gap={2} px={2}>
                        <SettingsMenu />
                        <SharePopover link={link} onCopy={clipboardCopy} />
                    </HStack>
                    
                    <Box px={2}>
                        <ExportMenu items={exports} />
                    </Box>

                </HStack>
            </ControlPanel>
        </Panel>
    );
}