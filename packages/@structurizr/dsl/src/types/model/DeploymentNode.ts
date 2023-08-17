import {
    ContainerInstance,
    IElement,
    ElementType,
    IContainerInstance,
    Identifier,
    IInfrastructureNode,
    InfrastructureNode,
    IRelationship,
    ISoftwareSystemInstance,
    ISupportImmutable,
    Perspectives,
    Properties,
    Relationship,
    SoftwareSystemInstance,
    Tag,
    Technology,
    Url
} from "../..";

export interface IDeploymentNode extends IElement {
    type: ElementType.DeploymentNode;
    identifier: Identifier;
    name: string;
    deploymentNodes: IDeploymentNode[];
    infrastructureNodes: IInfrastructureNode[];
    softwareSystemInstances: ISoftwareSystemInstance[];
    containerInstances: IContainerInstance[];
    technology: Technology[];
    description?: string;
    instances?: number;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: IRelationship[];
}

type DeploymentNodeValues =
    Required<Pick<IDeploymentNode, "identifier" | "name">>
    & Partial<Omit<IDeploymentNode, "type" | "identifier" | "name">>;

export class DeploymentNode implements IElement, ISupportImmutable<IDeploymentNode> {
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
        this.properties = params.properties;
        this.perspectives = params.perspectives;
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
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toObject(): IDeploymentNode {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            deploymentNodes: this.deploymentNodes.map(d => d.toObject()),
            infrastructureNodes: this.infrastructureNodes.map(i => i.toObject()),
            softwareSystemInstances: this.softwareSystemInstances.map(s => s.toObject()),
            containerInstances: this.containerInstances.map(c => c.toObject()),
            technology: this.technology,
            description: this.description,
            instances: this.instances,
            tags: this.tags,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toObject())
        }
    }
}