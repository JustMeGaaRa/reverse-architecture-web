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
export declare function toRelationshipString(relationship: Relationship): string;
export declare function toRelationshipArrayString(relationships: Relationship[]): string;
export declare function relationship(sourceIdentifier: Identifier, targetIdentifier: Identifier, description?: string, technology?: Technology[], tags?: Tag[]): {
    sourceIdentifier: string;
    targetIdentifier: string;
    description: string;
    technology: Technology[];
    tags: Tag[];
};
//# sourceMappingURL=Relationship.d.ts.map