import { IWorkspace } from "@structurizr/dsl";

export interface IExportClient {
    export(workspace: IWorkspace): string;
}