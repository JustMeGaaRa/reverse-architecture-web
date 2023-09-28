import { FC } from "react";
import {
    SelectionContainerProvider,
    WorkspaceTableRow,
    WorkspaceGroupTableRow,
    WorkspaceTable,
} from "../components";
import { TableColumnInfo, WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceTableView: FC<{
    workspaces: WorkspaceInfo[];
    isGrouped?: boolean;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<number>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    isGrouped,
    onClick,
    onSelected,
    onRemove
}) => {
    const nameof = function<T>(name: keyof T) { return name; };
    const columns: TableColumnInfo[] = [
        { title: "Name", name: nameof<WorkspaceInfo>("name") },
        { title: "Created Date", name: nameof<WorkspaceInfo>("createdDate") },
        { title: "Created By", name: nameof<WorkspaceInfo>("createdBy") },
        { title: "Last Modified Date", name: nameof<WorkspaceInfo>("lastModifiedDate") },
        { title: "Last Modified By", name: nameof<WorkspaceInfo>("lastModifiedBy") },
    ];
    const groups = groupWorkspaces(workspaces);

    return (
        <SelectionContainerProvider>
            <WorkspaceTable columns={columns} onSelected={onSelected}>
                {isGrouped && groups.filter(group => group.name !== undefined).map(group => (
                    <WorkspaceGroupTableRow
                        key={group.name}
                        columns={columns}
                        group={group}
                        onClick={() => onClick?.(group)}
                    />
                ))}
                {isGrouped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                    <WorkspaceTableRow
                        key={workspace.workspaceId}
                        columns={columns}
                        workspace={workspace}
                        onClick={() => onClick?.(workspace)}
                    />
                ))}
                {!isGrouped && workspaces.map(workspace => (
                    <WorkspaceTableRow
                        key={workspace.workspaceId}
                        columns={columns}
                        workspace={workspace}
                        onClick={() => onClick?.(workspace)}
                    />
                ))}
            </WorkspaceTable>
        </SelectionContainerProvider>
    )
}