import { RelationshipStyleProperties } from "./RelationshipStyleProperties";
export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}
export declare function toRelationshipStyleString(relationshipStyle?: RelationshipStyle): string;
export declare function relationshipStyle(tag: string, style: Partial<RelationshipStyleProperties>): RelationshipStyle;
//# sourceMappingURL=RelationshipStyle.d.ts.map