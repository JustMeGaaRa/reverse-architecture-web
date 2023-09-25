import { WorkspaceInfo } from "../../workspaces/types";

export type WorkspaceGroupInfo = {
    groupId: string;
    name: string;
    lastModifiedDate: string;
    lastModifiedBy: string;

    workspaces: Array<WorkspaceInfo>;
}