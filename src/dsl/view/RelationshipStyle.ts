import { RelationshipStyleProperties } from "./RelationshipStyleProperties";


export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}

export function relationship(
    tag: string,
    style: Partial<RelationshipStyleProperties>
): RelationshipStyle {
    return {
        [tag]: style
    }
}