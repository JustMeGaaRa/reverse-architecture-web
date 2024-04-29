import { All, Identifier, ViewType } from "../types";
import { IAutoLayout } from "./IAutoLayout";
import { IElementMetadata } from "./IElementMetadata";
import { IProperties } from "./IProperties";
import { IRelationshipMetadata } from "./IRelationshipMetadata";

export interface IContainerView {
    type: ViewType.Container;
    softwareSystemIdentifier: Identifier;
    key: string;
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
