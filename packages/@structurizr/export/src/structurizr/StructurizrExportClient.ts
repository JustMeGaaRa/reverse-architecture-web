import { Workspace } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";
import { StructurizrExportVisitor } from "./StructurizrExportVisitor";

export class StructurizrExportClient implements IExportClient {
    export(workspace: Workspace): string {
        const visitor = new StructurizrExportVisitor();
        return visitor.visitWorkspace(workspace);
    }
}