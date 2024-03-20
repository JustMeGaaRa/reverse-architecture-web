import { IElementPosition } from "./IElementPosition";
import { IRelationshipPosition } from "./IRelationshipPosition";

export interface IModelMetadata {
    elements?: Array<IElementPosition>;
    relationships?: Array<IRelationshipPosition>;
}
