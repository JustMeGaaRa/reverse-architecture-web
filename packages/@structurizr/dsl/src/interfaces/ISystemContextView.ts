import { All, Identifier, ViewType } from "../types";
import { IViewDefinition } from "./IViewDefinition";
import { IRelationshipMetadata } from "./IRelationshipMetadata";
import { IElementMetadata } from "./IElementMetadata";
import { IProperties } from "./IProperties";
import { IAutoLayout } from "./IAutoLayout";

export interface ISystemContextView extends IViewDefinition {
    type: ViewType.SystemContext;
    identifier: string;
    softwareSystemIdentifier: Identifier;
    key?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: IProperties;
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}
