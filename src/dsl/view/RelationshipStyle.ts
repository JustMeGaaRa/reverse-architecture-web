import { RelationshipStyleProperties } from "./RelationshipStyleProperties";


export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}

export function toRelationshipStyleString(relationshipStyle: RelationshipStyle): string {
    if (!relationshipStyle) {
        return "";
    }
    
    return Object.keys(relationshipStyle)
        .map(tag => {
            const style = relationshipStyle[tag];
            return `relationship "${tag}" {
                \t${Object.keys(style)
                    .map(key => `${key} ${style[key]}`)
                    .join("\n\t")}
            }`
        })
        .join("\n\t")
}

export function relationship(
    tag: string,
    style: Partial<RelationshipStyleProperties>
): RelationshipStyle {
    return {
        [tag]: style
    }
}