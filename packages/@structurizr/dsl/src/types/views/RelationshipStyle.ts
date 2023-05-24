import { RelationshipStyleProperties } from "./RelationshipStyleProperties";

export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}