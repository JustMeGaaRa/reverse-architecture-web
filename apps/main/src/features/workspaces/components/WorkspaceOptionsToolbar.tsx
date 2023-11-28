import { Icon, IconButton, Text } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "@reversearchitecture/ui";
import { AppleShortcuts, BinMinus, Cancel, Copy } from "iconoir-react";
import { FC, useCallback, useState } from "react";
import { useWorkspaceCollection } from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export const WorkspaceOptionsToolbar: FC<{
    onStack?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> =({
    onStack,
    onRemove
}) => {
    const [ selected, setSelected ] = useState<any[]>([]);
    const { selectedIndicies, clearSelected, turnOffSelectionMode } = useWorkspaceCollection();

    const handleOnCancelSelection = useCallback(() => {
        setSelected([]);
        clearSelected();
        turnOffSelectionMode();
    }, [clearSelected, turnOffSelectionMode]);

    const handleOnWorkspacesStack = useCallback(() => {
        onStack?.(selected);
    }, [onStack, selected]);

    const handleOnWorkspaceRemove = useCallback(() => {
        onRemove?.(selected);
    }, [onRemove, selected]);

    return (
        <Toolbar>
            <ToolbarSection>
                <IconButton
                    aria-label={"close"}
                    icon={<Icon as={Cancel} boxSize={5} />}
                    title={"close"}
                    variant={"tonal"}
                    onClick={handleOnCancelSelection}
                />
                <Text paddingX={2} color={"gray.900"} textStyle={"b3"}>
                    {`${selectedIndicies.length} selected`}
                </Text>
            </ToolbarSection>
            <ToolbarSection>
                <IconButton
                    aria-label={"stack workspaces together"}
                    icon={<Icon as={AppleShortcuts} boxSize={5} />}
                    title={"stack workspaces together"}
                    variant={"toolitem"}
                    onClick={handleOnWorkspacesStack}
                />
                <IconButton
                    aria-label={"clone workspace"}
                    icon={<Icon as={Copy} boxSize={5} />}
                    title={"workspaces together"}
                />
                <IconButton
                    aria-label={"remove workspaces"}
                    icon={<Icon as={BinMinus} boxSize={5} />}
                    title={"remove workspaces"}
                    onClick={handleOnWorkspaceRemove}
                />
            </ToolbarSection>
        </Toolbar>
    )
}