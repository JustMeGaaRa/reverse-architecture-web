import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export const getGroupInfo = (workspaces: WorkspaceInfo[], name?: string) => {
    const sorted = workspaces.sort((left, right) => {
        const leftTime = new Date(right.lastModifiedDate).getTime();
        const rightTime = new Date(left.lastModifiedDate).getTime();
        return leftTime - rightTime;
    });

    return {
        name: name ?? sorted.at(0)?.group,
        lastModifiedDate: sorted.at(0)?.lastModifiedDate,
        lastModifiedBy: sorted.at(0)?.lastModifiedBy,
        workspaces: sorted
    };
}

export const groupWorkspaces = (workspaces: WorkspaceInfo[]) => {
    const groups = Array.from(workspaces.reduce((groups, workspace) => {
        groups.has(workspace.group)
            ? groups.get(workspace.group)?.push(workspace)
            : groups.set(workspace.group, [workspace]);
        return groups;
    }, new Map<string, WorkspaceInfo[]>()));

    return groups
        .map(([name, workspaces]) => getGroupInfo(workspaces, name))
        .filter(group => group.name !== undefined);
}