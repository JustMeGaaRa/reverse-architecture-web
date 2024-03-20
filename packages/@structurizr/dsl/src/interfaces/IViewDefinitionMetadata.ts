import { Identifier } from "../types";
import { IElementPosition } from "./IElementPosition";
import { IRelationshipPosition } from "./IRelationshipPosition";

export interface IViewDefinitionMetadata {
    identifier: Identifier;
    key?: string;
    elements?: Array<IElementPosition>;
    relationships?: Array<IRelationshipPosition>;
}
