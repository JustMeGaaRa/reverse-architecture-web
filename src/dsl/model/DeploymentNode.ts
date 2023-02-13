import { ContainerInstance } from "./ContainerInstance";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { InfrastructureNode } from "./InfrastructureNode";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance } from "./SoftwareSystemInstance";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export interface DeploymentNode extends Omit<Element, "description"> {
    identifier: Identifier;
    name: string;
    deploymentNodes?: DeploymentNode[];
    infrastructureNodes?: InfrastructureNode[];
    softwareSystemInstances?: SoftwareSystemInstance[];
    containerInstances?: ContainerInstance[];
    relationships?: Relationship[];
    description?: string;
    technology?: Technology[];
    instances?: number;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
}

export function deploymentNode(
    identifier: Identifier,
    name: string,
    description?: string,
    technology?: Technology[],
    instances?: number,
    tags?: Tag[],
    deploymentNodes?: DeploymentNode[],
    softwareSystemInstances?: SoftwareSystemInstance[],
    containerInstances?: ContainerInstance[]
): DeploymentNode {
    return {
        identifier,
        name,
        description,
        technology,
        instances,
        tags: [
            Tag.Element,
            Tag.DeploymentNode,
            ...(tags ?? [])
        ],
        deploymentNodes,
        softwareSystemInstances,
        containerInstances
    }
}