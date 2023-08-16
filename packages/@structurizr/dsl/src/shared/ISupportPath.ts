import { IWorkspace, Workspace } from "../types/Workspace";
import { IViewDefinition, ViewKeys } from "../types/views/IViewDefinition";

export interface ISupportPath {
    getPath: (workspace: IWorkspace, view: IViewDefinition) => Array<ViewKeys>;
}