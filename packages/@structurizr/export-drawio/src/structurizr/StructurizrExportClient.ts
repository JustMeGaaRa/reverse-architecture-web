import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";
import { StructurizrExportVisitor } from "./StructurizrExportVisitor";

export class StructurizrExportClient implements IExportClient {
    export(workspace: IWorkspaceSnapshot): string {
        const visitor = new StructurizrExportVisitor();
        return visitor.visitWorkspace(workspace).join("\n");
    }
}