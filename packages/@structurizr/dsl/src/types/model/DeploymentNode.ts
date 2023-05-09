import { indent } from "../../utils/Formatting";
import { ContainerInstance, toContainerInstanceArrayString } from "./ContainerInstance";
import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { InfrastructureNode } from "./InfrastructureNode";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance, toSoftwareSystemInstanceArrayString } from "./SoftwareSystemInstance";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export type DeploymentNodeParams =
    Required<Pick<DeploymentNode, "identifier" | "name">>
    & Partial<Omit<DeploymentNode, "identifier" | "name" | "type">>;

export class DeploymentNode implements Element {
    constructor(params: DeploymentNodeParams) {
        this.type = ElementType.DeploymentNode;
        this.identifier = params.identifier;
        this.name = params.name;
        this.deploymentNodes = params.deploymentNodes;
        this.infrastructureNodes = params.infrastructureNodes;
        this.softwareSystemInstances = params.softwareSystemInstances;
        this.containerInstances = params.containerInstances;
        this.technology = params.technology;
        this.description = params.description;
        this.instances = params.instances;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships;
        this.tags = [
            Tag.Element,
            Tag.DeploymentNode,
            ...(params.tags ?? [])
        ];
    }

    public readonly type: ElementType.DeploymentNode;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly deploymentNodes?: DeploymentNode[];
    public readonly infrastructureNodes?: InfrastructureNode[];
    public readonly softwareSystemInstances?: SoftwareSystemInstance[];
    public readonly containerInstances?: ContainerInstance[];
    public readonly technology?: Technology[];
    public readonly description?: string;
    public readonly instances?: number;
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships?: Relationship[];
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