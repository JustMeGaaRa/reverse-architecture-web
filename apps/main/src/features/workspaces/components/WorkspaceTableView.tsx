import { FC } from "react";
import {
    WorkspaceTableRow,
    WorkspaceTable,
} from "../components";
import { useWorkspaceSelection } from "../hooks";
import { TableColumnInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceTableView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (selectedId: string) => void;
    onClone?: (selectedId: string) => void;
    onArchive?: (selectedId: string) => void;
    onRestore?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onClone,
    onArchive,
    onRestore,
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

    return (
        <WorkspaceTable columns={columns}>
            {groupped && groups.map(group => (
                <WorkspaceTableRow
                    key={group.name}
                    columns={columns}
                    data={group}
                    isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                    isGrouped={true}
                    onOpen={() => onOpen?.(group.name)}
                    onSelect={() => toggleSelected?.(group.name)}
                    onClone={() => onClone?.(group.name)}
                    onArchive={() => onArchive?.(group.name)}
                    onRestore={() => onRestore?.(group.name)}
                    onDelete={() => onDelete?.(group.name)}
                />
            ))}
            {groupped && groups.flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
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
                <WorkspaceTableRow
                    key={workspace.workspaceId}
                    columns={columns}
                    data={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onOpen={() => onOpen?.(workspace.workspaceId)}
                    onSelect={() => toggleSelected?.(workspace.workspaceId)}
                    onClone={() => onClone?.(workspace.workspaceId)}
                    onArchive={() => onArchive?.(workspace.workspaceId)}
                    onRestore={() => onRestore?.(workspace.workspaceId)}
                    onDelete={() => onDelete?.(workspace.workspaceId)}
                />
            ))}
        </WorkspaceTable>
    )
}