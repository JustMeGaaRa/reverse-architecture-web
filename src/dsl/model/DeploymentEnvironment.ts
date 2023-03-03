import { indent } from "../utils";
import { DeploymentGroup } from "./DeploymentGroup";
import { DeploymentNode, toDeploymentNodeArrayString } from "./DeploymentNode";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";

export interface DeploymentEnvironment {
    identifier?: Identifier;
    name: string;
    deploymentGroups?: DeploymentGroup[];
    deploymentNodes?: DeploymentNode[];
    relationships?: Relationship[];
}

export function toDeploymentEnvironmentString(environment: DeploymentEnvironment): string {
    const deploymentNodes = indent(toDeploymentNodeArrayString(environment.deploymentNodes ?? []));
    return environment
        ? `deploymentEnvironment "${environment.name}" {\n${deploymentNodes}\n}`
        : "";
}

export function toDeploymentEnvironmentArrayString(environments: DeploymentEnvironment[]): string {
    return environments.map(toDeploymentEnvironmentString).join("\n");
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