import { ElementType, Identifier, IPerson, ISupportSnapshot, Tag, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { Relationship } from "./Relationship";

export class Person implements ISupportSnapshot<IPerson> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Person;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IPerson {
        return Object.freeze({
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            tags: this.tags ?? [],
            url: this.url,
            relationships: this.relationships?.map(relationship => relationship.toSnapshot())
        })
    }
        
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}