import { IViewDefinition, IWorkspace, ViewKeys } from "@structurizr/dsl";

export interface ISupportPath {
    getPath: (workspace: IWorkspace, view: IViewDefinition) => Array<ViewKeys>;
}