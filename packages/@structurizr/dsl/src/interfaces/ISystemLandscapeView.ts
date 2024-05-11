import { All, Identifier, ViewType } from "../types";
import { IAutoLayout } from "./IAutoLayout";
import { IElementMetadata } from "./IElementMetadata";
import { IProperties } from "./IProperties";
import { IRelationshipMetadata } from "./IRelationshipMetadata";
import { IViewDefinitionMetadata } from "./IViewDefinitionMetadata";

export interface ISystemLandscapeView extends IViewDefinitionMetadata {
    type: ViewType.SystemLandscape;
    key?: string;
    title?: string;
    description?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    properties?: IProperties;
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}
