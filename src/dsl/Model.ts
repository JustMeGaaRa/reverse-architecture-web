import { Relationship, toRelationshipString } from "./model/Relationship";
import { DeploymentEnvironment, toDeploymentEnvironmentString } from "./model/DeploymentEnvironment";
import { SoftwareSystem, toSoftwareSystemString } from "./model/SoftwareSystem";
import { Person, toPersonString } from "./model/Person";
import { Group } from "./model/Group";
import { Enterprise, toEnterpriseString } from "./model/Enterprise";

export interface Model {
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
    deploymentEnvironments?: DeploymentEnvironment[];
    relationships?: Relationship[];
    enterprise?: Enterprise;
    groups?: Group[];
    elements?: Element[];
}

export function toModelString(model: Model): string {
    return `model {
        ${toEnterpriseString(model.enterprise)}
        ${model.people?.map(toPersonString).join("\n") ?? ""}
        ${model.softwareSystems?.map(toSoftwareSystemString).join("\n") ?? ""}
        ${model.deploymentEnvironments?.map(toDeploymentEnvironmentString).join("\n") ?? ""}
        ${model.relationships?.map(toRelationshipString).join("\n") ?? ""}
    }`;
}

export function model(
    people?: Person[],
    softwareSystems?: SoftwareSystem[],
    deploymentEnvironments?: DeploymentEnvironment[],
    relationships?: Relationship[],
    enterprise?: Enterprise,
    groups?: Group[],
    elements?: Element[]
): Model {
    return {
        people,
        softwareSystems,
        deploymentEnvironments,
        relationships,
        enterprise,
        groups,
        elements
    }
}