import { HealthCheck } from "./HealthCheck";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

export interface ContainerInstance {
    identifier?: Identifier;
    containerIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: Relationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}

export function toContainerInstanceString(instance: ContainerInstance): string {
    return `${instance.identifier} = containerInstance "${instance.containerIdentifier}"`;
}

export function containerInstance(
    containerIdentifier: Identifier,
    identifier: Identifier,
    deploymentGroups?: Identifier[],
    tags?: Tag[]
) {
    return {
        identifier,
        containerIdentifier,
        deploymentGroups,
        tags: [
            Tag.Element,
            Tag.Container,
            Tag.ContainerInstance,
            ...(tags ?? [])
        ]
    }
}