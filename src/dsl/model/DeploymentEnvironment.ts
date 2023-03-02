import { DeploymentGroup } from "./DeploymentGroup";
import { DeploymentNode, toDeploymentNodeString } from "./DeploymentNode";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";

export interface DeploymentEnvironment {
    identifier?: Identifier;
    name: string;
    deploymentGroups?: DeploymentGroup[];
    deploymentNodes?: DeploymentNode[];
    relationships?: Relationship[];
}

export function toDeploymentEnvironmentString(deploymentEnvironment: DeploymentEnvironment): string {
    return deploymentEnvironment ? `deploymentEnvironment "${deploymentEnvironment.name}" {
        ${deploymentEnvironment.deploymentNodes?.map(toDeploymentNodeString).join("\n") ?? ""}
    }` : "";
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