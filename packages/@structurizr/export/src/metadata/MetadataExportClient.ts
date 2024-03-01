import { IWorkspace, WorkspaceMetadata } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";

export class MetadataExportClient implements IExportClient {
    export(workspace: IWorkspace): string {
        throw new Error("Method not implemented.");
    }
}