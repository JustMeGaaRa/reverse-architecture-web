import { ElementType, IComponent, Identifier, ISupportSnapshot, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { Relationship } from "./Relationship";

export class Component implements ISupportSnapshot<IComponent> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Component;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public set technology(value: Array<Technology>) { this.propertiesMap.set("technology", value); }

    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public get relationships(): Array<Relationship> { return this.relationshipsArray.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(component: IComponent) {
        this.identifier = component.identifier;
        this.name = component.name;
        this.description = component.description;
        this.technology = component.technology;
        this.tags = component.tags;
        this.url = component.url;
        component.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

    public toSnapshot(): IComponent {
        return Object.freeze({
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
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