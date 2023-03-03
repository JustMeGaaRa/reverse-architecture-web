import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export interface Relationship {
    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
}

export function toRelationshipString(relationship: Relationship): string {
    return `${relationship.sourceIdentifier} -> ${relationship.targetIdentifier} "${relationship.description ?? ""}"`;
}

export function toRelationshipArrayString(relationships: Relationship[]): string {
    return relationships.map(toRelationshipString).join("\n");
}

export function relationship(
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier,
    description?: string,
    technology?: Technology[],
    tags?: Tag[]
) {
    return {
        sourceIdentifier,
        targetIdentifier,
        description,
        technology,
        tags: [
            Tag.Relationship,
            ...(tags ?? [])
        ]
    }
}