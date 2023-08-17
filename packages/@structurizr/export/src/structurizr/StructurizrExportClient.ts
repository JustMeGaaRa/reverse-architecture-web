import { IWorkspace } from "@structurizr/dsl";
import { IExportClient } from "../shared/IExportClient";
import { StructurizrExportVisitor } from "./StructurizrExportVisitor";

export class StructurizrExportClient implements IExportClient {
    export(workspace: IWorkspace): string {
        const visitor = new StructurizrExportVisitor();
        return visitor.visitWorkspace(workspace);
    }
}