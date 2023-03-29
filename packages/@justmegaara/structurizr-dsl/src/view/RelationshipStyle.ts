import { indent, line } from "../utils";
import { RelationshipStyleProperties } from "./RelationshipStyleProperties";


export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}

export function toRelationshipStyleString(relationshipStyle?: RelationshipStyle): string {
    if (!relationshipStyle) {
        return "";
    }
    
    return Object.keys(relationshipStyle)
        .map(tag => {
            const style: any = relationshipStyle[tag];
            const properties = Object.keys(style)
                .map(property => line(indent(`${property} ${style[property]}`)))
                .join("");
            return `element "${tag}" {\n${properties}\n}`;
        })
        .join("\n");
}

export function relationshipStyle(
    tag: string,
    style: Partial<RelationshipStyleProperties>
): RelationshipStyle {
    return {
        [tag]: style
    }
}