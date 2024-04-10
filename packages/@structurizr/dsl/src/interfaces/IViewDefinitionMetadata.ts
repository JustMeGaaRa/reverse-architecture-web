import { Identifier } from "../types";
import { IElementMetadata } from "./IElementMetadata";
import { IRelationshipMetadata } from "./IRelationshipMetadata";

export interface IViewDefinitionMetadata {
    identifier: Identifier;
    key?: string;
    elements?: Array<IElementMetadata>;
    relationships?: Array<IRelationshipMetadata>;
}
