import { ElementType, IContainerInstance, Identifier, ISupportSnapshot, Tag, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class ContainerInstance implements ISupportSnapshot<IContainerInstance> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.ContainerInstance;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get containerIdentifier(): Identifier { return this.propertiesMap.get("containerIdentifier") as Identifier; }
    public set containerIdentifier(value: Identifier) { this.propertiesMap.set("containerIdentifier", value); }

    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public set deploymentGroups(value: Array<string>) { this.propertiesMap.set("deploymentGroups", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }
    
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public fromSnapshot(containerInstance: IContainerInstance) {
        this.identifier = containerInstance.identifier;
        this.containerIdentifier = containerInstance.containerIdentifier;
        this.deploymentGroups = containerInstance.deploymentGroups;
        this.description = containerInstance.description;
        this.tags = containerInstance.tags;
        this.url = containerInstance.url;
    }

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
