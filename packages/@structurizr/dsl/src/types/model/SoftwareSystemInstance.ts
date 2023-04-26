import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Relationship } from "./Relationship";
import { HealthCheck } from "./HealthCheck";

export interface SoftwareSystemInstance {
    identifier?: Identifier;
    softwareSystemIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: Relationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}

export function toSoftwareSystemInstanceString(instance: SoftwareSystemInstance): string {
    return `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`;
}

export function toSoftwareSystemInstanceArrayString(instances: SoftwareSystemInstance[]): string {
    return instances.map(toSoftwareSystemInstanceString).join("\n");
}

export function softwareSystemInstance(
    softwareSystemIdentifier: Identifier,
    identifier?: Identifier,
    deploymentGroups?: Identifier[],
    tags?: Tag[]
) {
    return {
        identifier,
        softwareSystemIdentifier,
        deploymentGroups,
        tags: [
            Tag.Element,
            Tag.SoftwareSystem,
            Tag.SoftwareSystemInstance,
            ...(tags ?? [])
        ]
    }
}