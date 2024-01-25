import { FC, useCallback } from "react";
import {
    WorkspaceTableRow,
    WorkspaceTable,
} from "../components";
import { useWorkspaceSelection } from "../hooks";
import { TableColumnInfo, WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceTableView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onDelete,
}) => {
    const { selectedIds, toggleSelected } = useWorkspaceSelection();
    
    const nameof = function<T>(name: keyof T) { return name; };
    const columns: TableColumnInfo[] = [
        { title: "Name", name: nameof<WorkspaceInfo>("name") },
        { title: "Created Date", name: nameof<WorkspaceInfo>("createdDate") },
        { title: "Created By", name: nameof<WorkspaceInfo>("createdBy") },
        { title: "Last Modified Date", name: nameof<WorkspaceInfo>("lastModifiedDate") },
        { title: "Last Modified By", name: nameof<WorkspaceInfo>("lastModifiedBy") },
    ];
    const groups = groupWorkspaces(workspaces);

    const handleOnWorkspaceTouchStart = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceTouchEnd = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceOpen = useCallback((selectedId: string) => {
        onOpen?.(selectedId);
    }, [onOpen]);

    const handleOnWorkspaceSelect = useCallback((selectedId: string) => {
        toggleSelected(selectedId);
    }, [toggleSelected]);

    const handleOnWorkspaceRename = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceClone = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceDelete = useCallback((selectedId: string) => {
        onDelete?.(selectedId);
    }, [onDelete]);

    return (
        <WorkspaceTable columns={columns}>
            {groupped && groups.map(group => (
                <WorkspaceTableRow
                    key={group.name}
                    columns={columns}
                    data={group}
                    isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                    isGrouped={true}
                    onTouchStart={() => handleOnWorkspaceTouchStart(group)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(group)}
                    onOpen={() => handleOnWorkspaceOpen?.(group.name)}
                    onSelect={() => handleOnWorkspaceSelect?.(group.name)}
                    onRename={() => handleOnWorkspaceRename?.(group)}
                    onClone={() => handleOnWorkspaceClone?.(group)}
                    onDelete={() => handleOnWorkspaceDelete?.(group.name)}
                />
            ))}
            {groupped && groups.flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace.workspaceId)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace.workspaceId)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace.workspaceId)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace.workspaceId)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace.workspaceId)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace.workspaceId)}
                />
            ))}
        </WorkspaceTable>
    )
}