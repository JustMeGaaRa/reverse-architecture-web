import { FC, useCallback } from "react";
import {
    WorkspaceTableRow,
    WorkspaceTable,
} from "../components";
import { useWorkspaceCollection } from "../hooks";
import { TableColumnInfo, WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces, isWorkspace } from "../utils";

export const WorkspaceTableView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onDelete?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onDelete,
}) => {
    const { selected, toggleSelected } = useWorkspaceCollection();
    
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

    const handleOnWorkspaceOpen = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onOpen?.(data);
    }, [onOpen]);

    const handleOnWorkspaceSelect = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        toggleSelected(data);
    }, [toggleSelected]);

    const handleOnWorkspaceRename = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceClone = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceDelete = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onDelete?.([data]);
    }, [onDelete]);

    return (
        <WorkspaceTable columns={columns}>
            {groupped && groups.filter(group => group.name !== undefined).map(group => (
                <WorkspaceTableRow
                    key={group.name}
                    columns={columns}
                    isSelected={selected.some(x => x.name === group.name)}
                    isGrouped={true}
                    data={group}
                    onTouchStart={() => handleOnWorkspaceTouchStart(group)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(group)}
                    onOpen={() => handleOnWorkspaceOpen?.(group)}
                    onSelect={() => handleOnWorkspaceSelect?.(group)}
                    onRename={() => handleOnWorkspaceRename?.(group)}
                    onClone={() => handleOnWorkspaceClone?.(group)}
                    onDelete={() => handleOnWorkspaceDelete?.(group)}
                />
            ))}
            {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    isSelected={selected.some(x => isWorkspace(x) && x.workspaceId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    isSelected={selected.some(x => isWorkspace(x) && x.workspaceId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace)}
                />
            ))}
        </WorkspaceTable>
    )
}