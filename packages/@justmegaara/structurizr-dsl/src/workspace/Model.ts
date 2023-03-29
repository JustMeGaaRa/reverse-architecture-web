import { Relationship, toRelationshipArrayString } from "../model/Relationship";
import { DeploymentEnvironment, toDeploymentEnvironmentArrayString } from "../model/DeploymentEnvironment";
import { SoftwareSystem, toSoftwareSystemArrayString } from "../model/SoftwareSystem";
import { Person, toPersonArrayString } from "../model/Person";
import { Group } from "../model/Group";
import { Enterprise, toEnterpriseString } from "../model/Enterprise";
import { indent } from "../utils";

export interface Model {
    people: Person[];
    softwareSystems: SoftwareSystem[];
    deploymentEnvironments: DeploymentEnvironment[];
    relationships: Relationship[];
    enterprise?: Enterprise;
    groups: Group[];
    elements: Element[];
}

export function toModelString(model: Model): string {
    const enterprise = indent(toEnterpriseString(model.enterprise));
    const people = indent(toPersonArrayString(model.people ?? []));
    const softwareSystems = indent(toSoftwareSystemArrayString(model.softwareSystems ?? []));
    const environments = indent(toDeploymentEnvironmentArrayString(model.deploymentEnvironments ?? []));
    const relationships = indent(toRelationshipArrayString(model.relationships ?? []));
    return `model {\n${enterprise}\n${people}\n${softwareSystems}\n${environments}\n${relationships}\n}`;
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
        people: people ?? [],
        softwareSystems: softwareSystems ?? [],
        deploymentEnvironments: deploymentEnvironments ?? [],
        relationships: relationships ?? [],
        enterprise,
        groups: groups ?? [],
        elements: elements ?? []
    }
}