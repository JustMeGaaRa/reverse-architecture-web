import {
    ElementType,
    Identifier,
    ISoftwareSystem,
    ISupportSnapshot,
    Tag,
    Technology,
    Url
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Container } from "./Container";
import { Group } from "./Group";
import { Relationship } from "./Relationship";
import {
    createContainerPropertiesMap,
    createGroupPropertiesMap,
    createRelationshipPropertiesMap
} from "./utils";

export class SoftwareSystem implements ISupportSnapshot<ISoftwareSystem> {
    private get groupsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("groups") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containers") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.SoftwareSystem;

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
    public get containers(): Array<Container> { return this.containersArray?.map(container => new Container(container)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(softwareSystem: ISoftwareSystem) {
        this.identifier = softwareSystem.identifier;
        this.name = softwareSystem.name;
        this.description = softwareSystem.description;
        this.technology = softwareSystem.technology;
        this.tags = softwareSystem.tags;
        this.url = softwareSystem.url;
        softwareSystem.groups?.forEach(group => this.addGroup().fromSnapshot(group));
        softwareSystem.containers?.forEach(container => this.addContainer().fromSnapshot(container));
        softwareSystem.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

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
        const containerMap = createContainerPropertiesMap();
        this.containersArray.push([containerMap]);
        return new Container(containerMap);
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