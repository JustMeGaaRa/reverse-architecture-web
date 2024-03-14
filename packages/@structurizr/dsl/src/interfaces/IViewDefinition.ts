import { All, Identifier, ViewType } from "../types";
import { IViewDefinitionMetadata } from "./IViewDefinitionMetadata";
import { IProperties } from "./IProperties";
import { IAutoLayout } from "./IAutoLayout";


export interface IViewDefinition extends IViewDefinitionMetadata {
    type: ViewType;
    identifier: Identifier;
    key?: string;
    title?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    description?: string;
    properties?: IProperties;
}
