import { Identifier, IRelationship, ISupportSnapshot, RelationshipType, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class Relationship implements ISupportSnapshot<IRelationship> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: RelationshipType.Relationship;
    public get sourceIdentifier(): Identifier { return this.propertiesMap.get("sourceIdentifier") as Identifier; }
    public get targetIdentifier(): Identifier { return this.propertiesMap.get("targetIdentifier") as Identifier; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }

    public toSnapshot(): IRelationship {
        return Object.freeze({
            type: this.type,
            sourceIdentifier: this.sourceIdentifier,
            targetIdentifier: this.targetIdentifier,
            description: this.description,
            technology: this.technology,
            tags: this.tags ?? [],
            url: this.url,
        });
    }
}
