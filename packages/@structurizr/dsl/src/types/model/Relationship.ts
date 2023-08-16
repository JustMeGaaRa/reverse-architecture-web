import { Identifier, ISupportImmutable, Perspectives, Properties, RelationshipType, Tag, Technology, Url } from "../..";

type RelationshipParams =
    Required<Pick<Relationship, "sourceIdentifier" | "targetIdentifier">>
    & Partial<Omit<Relationship, "sourceIdentifier" | "targetIdentifier" | "type">>;

export interface IRelationship {
    type: RelationshipType.Relationship;
    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
}

export class Relationship implements ISupportImmutable<IRelationship> {
    constructor(params: RelationshipParams) {
        this.type = RelationshipType.Relationship;
        this.sourceIdentifier = params.sourceIdentifier;
        this.targetIdentifier = params.targetIdentifier;
        this.description = params.description;
        this.technology = params.technology;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
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
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;

    public toObject(): IRelationship {
        return {
            type: this.type,
            sourceIdentifier: this.sourceIdentifier,
            targetIdentifier: this.targetIdentifier,
            description: this.description,
            technology: this.technology,
            tags: this.tags,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives
        }
    }
}