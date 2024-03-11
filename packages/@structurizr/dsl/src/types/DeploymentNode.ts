import { IDeploymentNode, IElement, ISupportSnapshot } from "../interfaces";
import { ContainerInstance } from "./ContainerInstance";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { InfrastructureNode } from "./InfrastructureNode";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance } from "./SoftwareSystemInstance";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type DeploymentNodeValues =
    Required<Pick<IDeploymentNode, "identifier" | "name">>
    & Partial<Omit<IDeploymentNode, "type" | "identifier" | "name">>;

export class DeploymentNode implements IElement, ISupportSnapshot<IDeploymentNode> {
    constructor(params: DeploymentNodeValues) {
        this.type = ElementType.DeploymentNode;
        this.identifier = params.identifier;
        this.name = params.name;
        this.deploymentNodes = params.deploymentNodes ? params.deploymentNodes.map(d => new DeploymentNode(d)) : [];
        this.infrastructureNodes = params.infrastructureNodes ? params.infrastructureNodes.map(i => new InfrastructureNode(i)) : [];
        this.softwareSystemInstances = params.softwareSystemInstances ? params.softwareSystemInstances.map(s => new SoftwareSystemInstance(s)) : [];
        this.containerInstances = params.containerInstances ? params.containerInstances.map(c => new ContainerInstance(c)) : [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.instances = params.instances;
        this.url = params.url;
        // this.properties = params.properties;
        // this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.DeploymentNode,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.DeploymentNode.name) ?? []
            )
        ];
    }

    public readonly type: ElementType.DeploymentNode;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly deploymentNodes: DeploymentNode[];
    public readonly infrastructureNodes: InfrastructureNode[];
    public readonly softwareSystemInstances: SoftwareSystemInstance[];
    public readonly containerInstances: ContainerInstance[];
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly instances?: number;
    public readonly tags: Tag[];
    public readonly url?: Url;
    // public readonly properties?: Properties;
    // public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toSnapshot(): IDeploymentNode {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            deploymentNodes: this.deploymentNodes.map(d => d.toSnapshot()),
            infrastructureNodes: this.infrastructureNodes.map(i => i.toSnapshot()),
            softwareSystemInstances: this.softwareSystemInstances.map(s => s.toSnapshot()),
            containerInstances: this.containerInstances.map(c => c.toSnapshot()),
            technology: this.technology,
            description: this.description,
            instances: this.instances,
            tags: this.tags,
            url: this.url,
            // properties: this.properties,
            // perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toSnapshot())
        }
    }
}