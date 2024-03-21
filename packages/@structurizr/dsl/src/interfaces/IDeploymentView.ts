import { All, Identifier, ViewType } from "../types";
import { IViewDefinition } from "./IViewDefinition";
import { IRelationshipPosition } from "./IRelationshipPosition";
import { IElementPosition } from "./IElementPosition";
import { IProperties } from "./IProperties";
import { IAutoLayout } from "./IAutoLayout";

export interface IDeploymentView extends IViewDefinition {
    type: ViewType;
    identifier: Identifier;
    softwareSystemIdentifier: Identifier;
    environment: string;
    key?: string;
    title?: string;
    description?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}
