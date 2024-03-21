import { All, Identifier, ViewType } from "../types";
import { IViewDefinition } from "./IViewDefinition";
import { IRelationshipPosition } from "./IRelationshipPosition";
import { IElementPosition } from "./IElementPosition";
import { IProperties } from "./IProperties";
import { IAutoLayout } from "./IAutoLayout";

export interface IComponentView extends IViewDefinition {
    type: ViewType;
    identifier: Identifier;
    containerIdentifier: Identifier;
    key?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}
