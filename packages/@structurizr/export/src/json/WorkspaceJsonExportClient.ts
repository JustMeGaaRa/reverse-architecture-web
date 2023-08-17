import { IWorkspace } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";
import { WorkspaceJsonExportVisitor } from "./WorkspaceJsonExportVisitor";

export class WorkspaceJsonExportClient implements IExportClient {
    export(workspace: IWorkspace): string {
        const visitor = new WorkspaceJsonExportVisitor();
        return visitor.visitWorkspace(workspace);
    }
}