import { Relationship } from "./model/Relationship";
import { DeploymentEnvironment } from "./model/DeploymentEnvironment";
import { SoftwareSystem } from "./model/SoftwareSystem";
import { Person } from "./model/Person";
import { Group } from "./model/Group";
import { Enterprise } from "./model/Enterprise";


export interface Model {
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
    deploymentEnvironments?: DeploymentEnvironment[];
    relationships?: Relationship[];
    enterprise?: Enterprise;
    groups?: Group[];
    elements?: Element[];
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