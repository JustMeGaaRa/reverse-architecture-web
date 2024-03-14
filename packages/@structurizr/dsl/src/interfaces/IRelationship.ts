import {
    Identifier, RelationshipType,
    Tag,
    Technology,
    Url
} from "../types";


export interface IRelationship {
    type: RelationshipType.Relationship;
    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
}
