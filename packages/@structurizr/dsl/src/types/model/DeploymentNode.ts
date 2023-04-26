import { indent } from "../../utils/Formatting";
import { ContainerInstance, toContainerInstanceArrayString } from "./ContainerInstance";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { InfrastructureNode } from "./InfrastructureNode";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance, toSoftwareSystemInstanceArrayString } from "./SoftwareSystemInstance";
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

export function toDeploymentNodeString(deploymentNode: DeploymentNode): string {
    const deploymentNodes = indent(toDeploymentNodeArrayString(deploymentNode.deploymentNodes ?? []));
    const systems = indent(toSoftwareSystemInstanceArrayString(deploymentNode.softwareSystemInstances ?? []));
    const containers = indent(toContainerInstanceArrayString(deploymentNode.containerInstances ?? []));
    return deploymentNode
        ? `deploymentNode "${deploymentNode.name}" {\n${deploymentNodes}\n${systems}\n${containers}\n}`
        : "";
}

export function toDeploymentNodeArrayString(deploymentNodes: DeploymentNode[]): string {
    return deploymentNodes.map(toDeploymentNodeString).join("\n");
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