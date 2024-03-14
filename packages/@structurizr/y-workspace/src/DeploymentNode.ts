import { ElementType, Identifier, IDeploymentNode, ISupportSnapshot, Tag, Technology, Url } from "@structurizr/dsl";
import * as Y from "yjs";
import { ContainerInstance } from "./ContainerInstance";
import { InfrastructureNode } from "./InfrastructureNode";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance } from "./SoftwareSystemInstance";

export class DeploymentNode implements ISupportSnapshot<IDeploymentNode> {
    private get deploymentNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentNodes") as Y.Array<Y.Map<unknown>>; }
    private get infrastructureNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("infrastructureNodes") as Y.Array<Y.Map<unknown>>; }
    private get softwareSystemInstancesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("softwareSystemInstances") as Y.Array<Y.Map<unknown>>; }
    private get containerInstancesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerInstances") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.DeploymentNode;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string { return this.propertiesMap.get("description") as string; }
    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public get instances(): number { return this.propertiesMap.get("instances") as number; }
    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public get deploymentNodes(): Array<DeploymentNode> { return this.deploymentNodesArray?.map(node => new DeploymentNode(node)); }
    public get infrastructureNodes(): Array<InfrastructureNode> { return this.infrastructureNodesArray?.map(node => new InfrastructureNode(node)); }
    public get softwareSystemInstances(): Array<SoftwareSystemInstance> { return this.softwareSystemInstancesArray?.map(instance => new SoftwareSystemInstance(instance)); }
    public get containerInstances(): Array<ContainerInstance> { return this.containerInstancesArray?.map(instance => new ContainerInstance(instance)); }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IDeploymentNode {
        return Object.freeze({
            type: ElementType.DeploymentNode,
            identifier: this.identifier,
            name: this.name,
            description: this.description,
            technology: this.technology,
            instances: this.instances,
            tags: this.tags ?? [],
            url: this.url,
            deploymentNodes: this.deploymentNodes?.map(deploymentNode => deploymentNode.toSnapshot()),
            infrastructureNodes: this.infrastructureNodes?.map(infrastructureNode => infrastructureNode.toSnapshot()),
            softwareSystemInstances: this.softwareSystemInstances?.map(softwareSystemInstance => softwareSystemInstance.toSnapshot()),
            containerInstances: this.containerInstances?.map(containerInstance => containerInstance.toSnapshot()),
            relationships: this.relationships?.map(relationship => relationship.toSnapshot()),
        })
    }
}