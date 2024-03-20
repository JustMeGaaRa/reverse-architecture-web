import { ElementType, Identifier, ISoftwareSystemInstance, ISupportSnapshot, Tag, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class SoftwareSystemInstance implements ISupportSnapshot<ISoftwareSystemInstance> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.SoftwareSystemInstance;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get softwareSystemIdentifier(): Identifier { return this.propertiesMap.get("softwareSystemIdentifier") as Identifier; }
    public set softwareSystemIdentifier(value: Identifier) { this.propertiesMap.set("softwareSystemIdentifier", value); }

    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public set deploymentGroups(value: Array<string>) { this.propertiesMap.set("deploymentGroups", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public fromSnapshot(softwareSystemInstance: ISoftwareSystemInstance) {
        this.identifier = softwareSystemInstance.identifier;
        this.softwareSystemIdentifier = softwareSystemInstance.softwareSystemIdentifier;
        this.deploymentGroups = softwareSystemInstance.deploymentGroups;
        this.description = softwareSystemInstance.description;
        this.tags = softwareSystemInstance.tags;
        this.url = softwareSystemInstance.url;
    }

    public toSnapshot(): ISoftwareSystemInstance {
        return Object.freeze({
            type: ElementType.SoftwareSystemInstance,
            identifier: this.identifier,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
            deploymentGroups: this.deploymentGroups ?? [],
            description: this.description,
            tags: this.tags ?? [],
            url: this.url
        })
    }
}