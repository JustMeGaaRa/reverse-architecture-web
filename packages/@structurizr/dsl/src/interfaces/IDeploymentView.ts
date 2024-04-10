import { All, Identifier, ViewType } from "../types";
import { IViewDefinition } from "./IViewDefinition";
import { IRelationshipMetadata } from "./IRelationshipMetadata";
import { IElementMetadata } from "./IElementMetadata";
import { IProperties } from "./IProperties";
import { IAutoLayout } from "./IAutoLayout";

export interface IDeploymentView extends IViewDefinition {
    type: ViewType.Deployment;
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
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}
