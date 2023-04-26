import { IViewDefinition } from "./IViewDefinition";

export interface ISupportPath {
    getPath: () => Array<IViewDefinition>;
}