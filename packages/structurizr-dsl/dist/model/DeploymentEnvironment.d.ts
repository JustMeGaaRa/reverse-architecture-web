import { DeploymentGroup } from "./DeploymentGroup";
import { DeploymentNode } from "./DeploymentNode";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";
export interface DeploymentEnvironment {
    identifier: Identifier;
    name: string;
    deploymentGroups: DeploymentGroup[];
    deploymentNodes: DeploymentNode[];
    relationships: Relationship[];
}
export declare function toDeploymentEnvironmentString(environment: DeploymentEnvironment): string;
export declare function toDeploymentEnvironmentArrayString(environments: DeploymentEnvironment[]): string;
export declare function deploymentEnvironment(identifier: Identifier, name: string, deploymentNodes: DeploymentNode[]): DeploymentEnvironment;
//# sourceMappingURL=DeploymentEnvironment.d.ts.map