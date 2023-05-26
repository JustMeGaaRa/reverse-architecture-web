import { Workspace } from "../types/Workspace";
import { IView, IViewDefinition } from "./IView";

export interface ISupportPath {
    getPath: (workspace: Workspace, view: IView) => Array<IViewDefinition>;
}