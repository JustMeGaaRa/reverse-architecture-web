import { Workspace } from "@structurizr/dsl";

export interface IExportClient {
    export(workspace: Workspace): string;
}