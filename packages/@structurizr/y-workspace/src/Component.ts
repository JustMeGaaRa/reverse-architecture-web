import {
    ElementType,
    IComponent,
    Identifier,
    ISupportSnapshot,
    Tag,
    Technology,
    Url
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Relationship } from "./Relationship";
import { createRelationshipPropertiesMap } from "./utils";

export class Component implements ISupportSnapshot<IComponent> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }
    private get technologyArray(): Y.Array<string> { return this.propertiesMap.get("technology") as Y.Array<string>; }
    private get tagsArray(): Y.Array<string> { return this.propertiesMap.get("tags") as Y.Array<string>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get type(): ElementType.Component { return ElementType.Component; }

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public get technology(): Array<Technology> { return this.technologyArray?.map(technology => new Technology(technology)); }
    public get tags(): Array<Tag> { return this.tagsArray?.map(tag => new Tag(tag)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(component: IComponent) {
        this.identifier = component.identifier;
        this.name = component.name;
        this.description = component.description;
        this.url = component.url;
        this.technologyArray.push(component.technology?.map(x => x.name) ?? []);
        this.tagsArray.push(component.tags?.map(x => x.name) ?? []);
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
        const relationshipMap = createRelationshipPropertiesMap();
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}