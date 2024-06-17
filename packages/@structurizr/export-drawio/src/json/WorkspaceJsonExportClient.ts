import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";
import { WorkspaceJsonExportVisitor } from "./WorkspaceJsonExportVisitor";

export class WorkspaceJsonExportClient implements IExportClient {
    export(workspace: IWorkspaceSnapshot): string {
        const visitor = new WorkspaceJsonExportVisitor();
        return visitor.visitWorkspace(workspace);
    }
}