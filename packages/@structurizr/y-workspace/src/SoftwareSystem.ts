import { ElementType, Identifier, ISoftwareSystem, ISupportSnapshot, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { Container } from "./Container";
import { Group } from "./Group";
import { Relationship } from "./Relationship";

export class SoftwareSystem implements ISupportSnapshot<ISoftwareSystem> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containers") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.SoftwareSystem;
    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get containers(): Array<Container> { return this.containersArray?.map(container => new Container(container)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): ISoftwareSystem {
        return Object.freeze({
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags ?? [],
            url: this.url,
            containers: this.containers?.map(container => container.toSnapshot()),
            groups: this.groups?.map(group => group.toSnapshot()),
            relationships: this.relationships?.map(relationship => relationship.toSnapshot())
        })
    }

    public addContainer() {
        if (!this.propertiesMap.has("containers")) this.propertiesMap.set("containers", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const containerMap = new Y.Map([
            ["identifier", `container-${uniqueId}`],
            ["name", "Container"],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""],
            ["relationships", []],
            ["components", new Y.Array<Y.Map<unknown>>()],
            ["groups", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.containersArray.push([containerMap]);
        return new Container(containerMap);
    }
    
    public addGroup() {
        if (!this.propertiesMap.has("groups")) this.propertiesMap.set("groups", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const groupMap = new Y.Map([
            ["identifier", `group-${uniqueId}`],
            ["name", "Group"],
            ["tags", []],
            ["people", new Y.Array<Y.Map<unknown>>()],
            ["softwareSystems", new Y.Array<Y.Map<unknown>>()],
            ["containers", new Y.Array<Y.Map<unknown>>()],
            ["components", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.groupsArray.push([groupMap]);
        return new Group(groupMap);
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