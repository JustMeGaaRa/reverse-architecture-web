import { IWorkspaceSnapshot, WorkspaceMetadata } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";

export class MetadataExportClient implements IExportClient {
    export(workspace: IWorkspaceSnapshot): string {
        throw new Error("Method not implemented.");
    }
}