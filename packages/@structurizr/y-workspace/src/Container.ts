import {
    ElementType,
    IContainer,
    Identifier,
    ISupportSnapshot,
    Tag,
    Technology,
    Url
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Group } from "./Group";
import { Component } from "./Component";
import { Relationship } from "./Relationship";
import {
    createComponentPropertiesMap,
    createGroupPropertiesMap,
    createRelationshipPropertiesMap
} from "./utils";

export class Container implements ISupportSnapshot<IContainer> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("components") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.Container;

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

    public get groups(): Array<Group> { return this.groupsArray?.map(group => new Group(group)); }
    public get components(): Array<Component> { return this.componentsArray?.map(component => new Component(component)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(container: IContainer) {
        this.identifier = container.identifier;
        this.name = container.name;
        this.description = container.description;
        this.technology = container.technology;
        this.tags = container.tags;
        this.url = container.url;
        container.groups?.forEach(group => this.addGroup().fromSnapshot(group));
        container.components?.forEach(component => this.addComponent().fromSnapshot(component));
        container.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

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
        const componentMap = createComponentPropertiesMap();
        this.componentsArray.push([componentMap]);
        return new Component(componentMap);
    }
    
    public addGroup() {
        if (!this.propertiesMap.has("groups")) this.propertiesMap.set("groups", new Y.Array<Y.Map<unknown>>());
        const groupMap = createGroupPropertiesMap();
        this.groupsArray.push([groupMap]);
        return new Group(groupMap);
    }

    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const relationshipMap = createRelationshipPropertiesMap();
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}