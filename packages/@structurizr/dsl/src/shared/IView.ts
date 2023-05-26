import { AutoLayout } from "../types/views/AutoLayout";
import { Properties } from "../types/model/Properties";
import { IElementPosition, IRelationshipPosition } from "./IWorkspaceMetadata";
import { ViewType } from "../types/views/ViewType";
import { Identifier } from "../types/model/Identifier";

export interface IView extends IViewDefinition, IViewMetadata {
    key?: string;
    autoLayout?: AutoLayout;
    animation?: any;
    description?: string;
    properties?: Properties;
}

export interface IViewDefinition {
    type: ViewType;
    identifier: Identifier;
    title?: string;
}

export interface IViewMetadata {
    identifier: string;
    key?: string;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}