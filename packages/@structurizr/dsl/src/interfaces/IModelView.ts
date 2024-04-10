import { ViewType } from "../types";
import { IAutoLayout } from "./IAutoLayout";
import { IElementMetadata } from "./IElementMetadata";
import { IRelationshipMetadata } from "./IRelationshipMetadata";
import { IViewDefinition } from "./IViewDefinition";

export interface IModelView extends IViewDefinition {
    type: ViewType.Model;
    autoLayout?: IAutoLayout;
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}