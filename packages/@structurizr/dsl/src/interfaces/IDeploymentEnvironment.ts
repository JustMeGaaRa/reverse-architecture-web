import { DeploymentGroup, Identifier } from "../types";
import { IRelationship } from "./IRelationship";
import { IDeploymentNode } from "./IDeploymentNode";


export interface IDeploymentEnvironment {
    identifier: Identifier;
    name: string;
    deploymentGroups: DeploymentGroup[];
    deploymentNodes: IDeploymentNode[];
    relationships: IRelationship[];
}
