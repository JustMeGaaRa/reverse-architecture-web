import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Relationship } from "./Relationship";
import { HealthCheck } from "./HealthCheck";

export class SoftwareSystemInstance {
    constructor(softwareSystemIdentifier: Identifier, deploymentGroups?: Identifier[], tags?: Tag[]) {
        this.softwareSystemIdentifier = softwareSystemIdentifier;
        this.deploymentGroups = deploymentGroups;
        this.tags = [
            Tag.Element,
            Tag.SoftwareSystem,
            Tag.SoftwareSystemInstance,
            ...(tags ?? [])
        ];
    }

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

export function softwareSystemInstance(identifier: Identifier) {
    return new SoftwareSystemInstance(identifier);
}