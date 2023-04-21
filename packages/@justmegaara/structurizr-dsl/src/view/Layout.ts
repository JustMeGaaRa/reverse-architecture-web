import { Identifier } from "../model/Identifier";
import { Dimension } from "./Dimension";

export interface Layout {
    [elementIdentifier: Identifier]: Dimension;
}

export interface WorkspaceLayout {
    [viewIdentifier: Identifier]: Layout;
}