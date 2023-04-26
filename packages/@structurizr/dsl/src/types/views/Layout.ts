import { Identifier } from "../model/Identifier";
import { Dimension } from "./Dimension";
import { ViewType } from "./ViewType";

export interface Layout {
    [elementIdentifier: Identifier]: Dimension;
}

export interface WorkspaceLayout {
    views: Array<{
        type: ViewType;
        identifier: Identifier;
        elements: Layout;
    }>
}