import { IWorkspaceSnapshot } from "@structurizr/dsl";

export interface IExportClient {
    export(workspace: IWorkspaceSnapshot): string;
}