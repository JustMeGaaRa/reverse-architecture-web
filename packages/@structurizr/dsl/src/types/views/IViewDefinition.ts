import {
    All,
    Identifier,
    Properties,
    ViewType,
    IAutoLayout,
    IViewDefinitionMetadata
} from "../..";

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
    properties?: Properties;
}

export type ViewKeys = Pick<IViewDefinition, "type" | "identifier" | "title">;