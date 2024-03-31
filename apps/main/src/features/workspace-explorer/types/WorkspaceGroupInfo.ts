import { IWorkspaceInfo } from "@structurizr/y-workspace";

export interface IWorkspaceGroupInfo {
    name: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    workspaces: Array<IWorkspaceInfo>;
}