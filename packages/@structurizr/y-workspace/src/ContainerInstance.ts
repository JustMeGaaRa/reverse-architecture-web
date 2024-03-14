import { ElementType, IContainerInstance, Identifier, ISupportSnapshot, Tag, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class ContainerInstance implements ISupportSnapshot<IContainerInstance> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.ContainerInstance;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get containerIdentifier(): Identifier { return this.propertiesMap.get("containerIdentifier") as Identifier; }
    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }

    public toSnapshot(): IContainerInstance {
        return Object.freeze({
            type: ElementType.ContainerInstance,
            identifier: this.identifier,
            containerIdentifier: this.containerIdentifier,
            deploymentGroups: this.deploymentGroups ?? [],
            description: this.description,
            tags: this.tags ?? [],
            url: this.url
        });
    }
}
