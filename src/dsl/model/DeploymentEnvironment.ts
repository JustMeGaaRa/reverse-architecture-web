import { DeploymentGroup } from "./DeploymentGroup";
import { DeploymentNode } from "./DeploymentNode";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";

export interface DeploymentEnvironment {
    identifier?: Identifier;
    name: string;
    deploymentGroups?: DeploymentGroup[];
    deploymentNodes?: DeploymentNode[];
    relationships?: Relationship[];
}

export function deploymentEnvironment(
    identifier: Identifier,
    name: string,
    deploymentNodes: DeploymentNode[]
): DeploymentEnvironment {
    return {
        identifier,
        name,
        deploymentNodes
    }
}