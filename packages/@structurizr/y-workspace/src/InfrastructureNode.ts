import {
    ElementType,
    Identifier,
    IInfrastructureNode,
    ISupportSnapshot,
    Tag,
    Technology,
    Url
} from "@structurizr/dsl";
import * as Y from "yjs";
import { Relationship } from "./Relationship";
import { createRelationshipPropertiesMap } from "./utils";

export class InfrastructureNode implements ISupportSnapshot<IInfrastructureNode> {
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }
    private get technologyArray(): Y.Array<string> { return this.propertiesMap.get("technology") as Y.Array<string>; }
    private get tagsArray(): Y.Array<string> { return this.propertiesMap.get("tags") as Y.Array<string>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get type(): ElementType.InfrastructureNode { return ElementType.InfrastructureNode; }

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

    public fromSnapshot(infrastructureNode: IInfrastructureNode) {
        this.identifier = infrastructureNode.identifier;
        this.name = infrastructureNode.name;
        this.description = infrastructureNode.description;
        this.url = infrastructureNode.url;
        this.technologyArray.push(infrastructureNode.technology?.map(x => x.name) ?? []);
        this.tagsArray.push(infrastructureNode.tags?.map(x => x.name) ?? []);
        infrastructureNode.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

    public toSnapshot(): IInfrastructureNode {
        return Object.freeze({
            identifier: this.identifier,
            type: ElementType.InfrastructureNode,
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