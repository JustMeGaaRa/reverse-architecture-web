import { FC } from "react";
import {
    WorkspaceCollectionProvider,
    WorkspaceTableRow,
    WorkspaceTable,
} from "../components";
import { TableColumnInfo, WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceTableView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<string>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    groupped,
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
        <WorkspaceTable columns={columns} onSelected={onSelected}>
            {groupped && groups.filter(group => group.name !== undefined).map(group => (
                <WorkspaceTableRow
                    key={group.name}
                    columns={columns}
                    data={group}
                    isGrouped={true}
                    onClick={() => onClick?.(group)}
                />
            ))}
            {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    onClick={() => onClick?.(workspace)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    onClick={() => onClick?.(workspace)}
                />
            ))}
        </WorkspaceTable>
    )
}