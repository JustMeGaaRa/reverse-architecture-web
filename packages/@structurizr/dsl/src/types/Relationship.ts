import { IRelationship, ISupportSnapshot } from "../interfaces";
import { Identifier } from "./Identifier";
import { RelationshipType } from "./RelationshipType";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type RelationshipParams =
    Required<Pick<IRelationship, "sourceIdentifier" | "targetIdentifier">>
    & Partial<Omit<IRelationship, "sourceIdentifier" | "targetIdentifier" | "type">>;

export class Relationship implements ISupportSnapshot<IRelationship> {
    constructor(params: RelationshipParams) {
        this.type = RelationshipType.Relationship;
        this.sourceIdentifier = params.sourceIdentifier;
        this.targetIdentifier = params.targetIdentifier;
        this.description = params.description;
        this.technology = params.technology;
        this.url = params.url;
        // this.properties = params.properties;
        // this.perspectives = params.perspectives;
        this.tags = [
            Tag.Relationship,
            ...(params.tags ?? [])
        ];
    }

    public readonly type: RelationshipType.Relationship;
    public readonly sourceIdentifier: Identifier;
    public readonly targetIdentifier: Identifier;
    public readonly description?: string;
    public readonly technology?: Technology[];
    public readonly tags: Tag[];
    public readonly url?: Url;
    // public readonly properties?: Properties;
    // public readonly perspectives?: Perspectives;

    public toSnapshot(): IRelationship {
        return {
            type: this.type,
            sourceIdentifier: this.sourceIdentifier,
            targetIdentifier: this.targetIdentifier,
            description: this.description,
            technology: this.technology,
            tags: this.tags,
            url: this.url,
            // properties: this.properties,
            // perspectives: this.perspectives
        }
    }
}