import { HealthCheck } from "./HealthCheck";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

export class ContainerInstance {
    constructor(containerIdentifier: Identifier, deploymentGroups?: Identifier[], tags?: Tag[]) {
        this.containerIdentifier = containerIdentifier;
        this.deploymentGroups = deploymentGroups;
        this.tags = [
            Tag.Element,
            Tag.Container,
            Tag.ContainerInstance,
            ...(tags ?? [])
        ];
    }

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

export function containerInstance(identifier: Identifier) {
    return new ContainerInstance(identifier);
}