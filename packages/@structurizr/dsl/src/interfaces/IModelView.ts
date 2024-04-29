import { ViewType } from "../types";
import { IAutoLayout } from "./IAutoLayout";
import { IElementMetadata } from "./IElementMetadata";
import { IRelationshipMetadata } from "./IRelationshipMetadata";

export interface IModelView {
    type: ViewType.Model;
    key: string;
    autoLayout?: IAutoLayout;
    elements: Array<IElementMetadata>;
    relationships: Array<IRelationshipMetadata>;
}