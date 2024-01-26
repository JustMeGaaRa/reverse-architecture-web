import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import {
    WorkspaceStackCard,
    WorkspaceCard,
} from "../components";
import {
    useOnPressHold,
    useWorkspaceSelection
} from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (selectedId: string) => void;
    onRename?: (selectedId: string, name: string) => void;
    onClone?: (selectedId: string) => void;
    onArchive?: (selectedId: string) => void;
    onRestore?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onRename,
    onClone,
    onArchive,
    onRestore,
    onDelete,
}) => {
    const { selectedIds, toggleSelected } = useWorkspaceSelection();
    const { onStartHold, onCancelHold } = useOnPressHold();

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const groups = groupWorkspaces(workspaces);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groupped && groups.map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                    onOpen={() => onOpen?.(group.name)}
                    onSelect={() => toggleSelected?.(group.name)}
                    onClone={() => onClone?.(group.name)}
                    onArchive={() => onArchive?.(group.name)}
                    onRestore={() => onRestore?.(group.name)}
                    onDelete={() => onDelete?.(group.name)}
                />
            ))}
            {groupped && workspaces.filter(workspace => !workspace.group).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onOpen={() => onOpen?.(workspace.workspaceId)}
                    onSelect={() => toggleSelected?.(workspace.workspaceId)}
                    onClone={() => onClone?.(workspace.workspaceId)}
                    onArchive={() => onArchive?.(workspace.workspaceId)}
                    onRestore={() => onRestore?.(workspace.workspaceId)}
                    onDelete={() => onDelete?.(workspace.workspaceId)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onOpen={() => onOpen?.(workspace.workspaceId)}
                    onSelect={() => toggleSelected?.(workspace.workspaceId)}
                    onClone={() => onClone?.(workspace.workspaceId)}
                    onArchive={() => onArchive?.(workspace.workspaceId)}
                    onRestore={() => onRestore?.(workspace.workspaceId)}
                    onDelete={() => onDelete?.(workspace.workspaceId)}
                />
            ))}
        </Grid>
    )
}