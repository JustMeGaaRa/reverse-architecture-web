import { ElementType, IContainer, Identifier, ISupportSnapshot, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { Group } from "./Group";
import { Component } from "./Component";
import { Relationship } from "./Relationship";

export class Container implements ISupportSnapshot<IContainer> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("components") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Container;
    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get components(): Array<Component> { return this.componentsArray?.map(component => new Component(component)); }
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IContainer {
        return Object.freeze({
            identifier: this.identifier,
            type: this.type,
            name: this.name,
            description: this.description,
            technology: this.technology,
            tags: this.tags ?? [],
            url: this.url,
            components: this.components?.map(component => component.toSnapshot()),
            groups: this.groups?.map(group => group.toSnapshot()),
            relationships: this.relationships?.map(relationship => relationship.toSnapshot())
        })
    }

    public addComponent() {
        if (!this.propertiesMap.has("components")) this.propertiesMap.set("components", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const componentMap = new Y.Map([
            ["identifier", `component-${uniqueId}`],
            ["name", "Component"],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""],
            ["relationships", []]
        ]);
        this.componentsArray.push([componentMap]);
        return new Component(componentMap);
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