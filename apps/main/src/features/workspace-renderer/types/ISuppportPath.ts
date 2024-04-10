import { IViewDefinition, IWorkspaceSnapshot, ViewDefinition } from "@structurizr/dsl";

export type ViewKeys = Pick<IViewDefinition, "type" | "identifier" | "title">;

export interface ISupportPath {
    getPath: (workspace: IWorkspaceSnapshot, view: ViewDefinition) => Array<ViewDefinition>;
}