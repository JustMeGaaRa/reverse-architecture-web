import { ElementType, Identifier, IInfrastructureNode, ISupportSnapshot, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { Relationship } from "./Relationship";

export class InfrastructureNode implements ISupportSnapshot<IInfrastructureNode> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.InfrastructureNode;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

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
}