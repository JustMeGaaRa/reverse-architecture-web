import { ElementType, Identifier, ISoftwareSystemInstance, ISupportSnapshot, Tag, Url } from "@structurizr/dsl";
import * as Y from "yjs";

export class SoftwareSystemInstance implements ISupportSnapshot<ISoftwareSystemInstance> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.SoftwareSystemInstance;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get softwareSystemIdentifier(): Identifier { return this.propertiesMap.get("softwareSystemIdentifier") as Identifier; }
    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }

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