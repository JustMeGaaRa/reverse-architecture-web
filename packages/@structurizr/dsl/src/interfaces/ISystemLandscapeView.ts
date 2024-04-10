import { All, Identifier, ViewType } from "../types";
import { IAutoLayout } from "./IAutoLayout";
import { IElementMetadata } from "./IElementMetadata";
import { IProperties } from "./IProperties";
import { IRelationshipMetadata } from "./IRelationshipMetadata";
import { IViewDefinition } from "./IViewDefinition";

export interface ISystemLandscapeView extends IViewDefinition {
    type: ViewType.SystemLandscape;
    key?: string;
    description?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    title?: string;
    properties?: IProperties;
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}
