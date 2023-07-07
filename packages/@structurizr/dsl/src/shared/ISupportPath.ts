import { Workspace } from "../types/Workspace";
import { IViewDefinition, ViewKeys } from "../types/views/IViewDefinition";

export interface ISupportPath {
    getPath: (workspace: Workspace, view: IViewDefinition) => Array<ViewKeys>;
}