import { Identifier, IRelationship, ISupportSnapshot, RelationshipType, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class Relationship implements ISupportSnapshot<IRelationship> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: RelationshipType.Relationship;
    
    public get sourceIdentifier(): Identifier { return this.propertiesMap.get("sourceIdentifier") as Identifier; }
    public set sourceIdentifier(value: Identifier) { this.propertiesMap.set("sourceIdentifier", value); }

    public get targetIdentifier(): Identifier { return this.propertiesMap.get("targetIdentifier") as Identifier; }
    public set targetIdentifier(value: Identifier) { this.propertiesMap.set("targetIdentifier", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public set technology(value: Array<Technology>) { this.propertiesMap.set("technology", value); }

    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public fromSnapshot(relationship: IRelationship) {
        this.sourceIdentifier = relationship.sourceIdentifier;
        this.targetIdentifier = relationship.targetIdentifier;
        this.description = relationship.description;
        this.technology = relationship.technology;
        this.tags = relationship.tags;
        this.url = relationship.url;
    }

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
