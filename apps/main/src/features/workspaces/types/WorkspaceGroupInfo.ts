import { WorkspaceInfo } from "../../workspaces/types";

export type WorkspaceGroupInfo = {
    name: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    workspaces: Array<WorkspaceInfo>;
}