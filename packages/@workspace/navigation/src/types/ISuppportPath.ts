import { IViewDefinition, IWorkspaceSnapshot, ViewKeys } from "@structurizr/dsl";

export interface ISupportPath {
    getPath: (workspace: IWorkspaceSnapshot, view: IViewDefinition) => Array<ViewKeys>;
}