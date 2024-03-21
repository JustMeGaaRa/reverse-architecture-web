import {
    ElementType,
    Identifier,
    IDeploymentNode,
    ISupportSnapshot,
    Tag,
    Technology,
    Url
} from "@structurizr/dsl";
import * as Y from "yjs";
import { ContainerInstance } from "./ContainerInstance";
import { InfrastructureNode } from "./InfrastructureNode";
import { Relationship } from "./Relationship";
import { SoftwareSystemInstance } from "./SoftwareSystemInstance";
import {
    createContainerInstancePropertiesMap,
    createDeploymentNodePropertiesMap,
    createInfrastructureNodePropertiesMap,
    createRelationshipPropertiesMap,
    createSoftwareSystemInstancePropertiesMap
} from "./utils";

export class DeploymentNode implements ISupportSnapshot<IDeploymentNode> {
    private get deploymentNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentNodes") as Y.Array<Y.Map<unknown>>; }
    private get infrastructureNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("infrastructureNodes") as Y.Array<Y.Map<unknown>>; }
    private get softwareSystemInstancesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("softwareSystemInstances") as Y.Array<Y.Map<unknown>>; }
    private get containerInstancesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerInstances") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ElementType.DeploymentNode;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get technology(): Array<Technology> { return this.propertiesMap.get("technology") as Array<Technology>; }
    public set technology(value: Array<Technology>) { this.propertiesMap.set("technology", value); }

    public get instances(): number { return this.propertiesMap.get("instances") as number; }
    public set instances(value: number) { this.propertiesMap.set("instances", value); }

    public get tags(): Array<Tag> { return this.propertiesMap.get("tags") as Array<Tag>; }
    public set tags(value: Array<Tag>) { this.propertiesMap.set("tags", value); }

    public get url(): Url { return this.propertiesMap.get("url") as Url; }
    public set url(value: Url) { this.propertiesMap.set("url", value); }

    public get deploymentNodes(): Array<DeploymentNode> { return this.deploymentNodesArray?.map(node => new DeploymentNode(node)); }
    public get infrastructureNodes(): Array<InfrastructureNode> { return this.infrastructureNodesArray?.map(node => new InfrastructureNode(node)); }
    public get softwareSystemInstances(): Array<SoftwareSystemInstance> { return this.softwareSystemInstancesArray?.map(instance => new SoftwareSystemInstance(instance)); }
    public get containerInstances(): Array<ContainerInstance> { return this.containerInstancesArray?.map(instance => new ContainerInstance(instance)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray?.map(relationship => new Relationship(relationship)) ?? []; }

    public fromSnapshot(deploymentNode: IDeploymentNode) {
        this.identifier = deploymentNode.identifier;
        this.name = deploymentNode.name;
        this.description = deploymentNode.description;
        this.technology = deploymentNode.technology;
        this.instances = deploymentNode.instances;
        this.tags = deploymentNode.tags;
        this.url = deploymentNode.url;
        deploymentNode.deploymentNodes?.forEach(deploymentNode => this.addDeploymentNode().fromSnapshot(deploymentNode));
        deploymentNode.infrastructureNodes?.forEach(infrastructureNode => this.addInfrastructureNode().fromSnapshot(infrastructureNode));
        deploymentNode.softwareSystemInstances?.forEach(softwareSystemInstance => this.addSoftwareSystemInstance().fromSnapshot(softwareSystemInstance));
        deploymentNode.containerInstances?.forEach(containerInstance => this.addContainerInstance().fromSnapshot(containerInstance));
        deploymentNode.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

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

    public addDeploymentNode() {
        if (!this.propertiesMap.has("deploymentNodes")) this.propertiesMap.set("deploymentNodes", new Y.Array<Y.Map<unknown>>());
        const deploymentNodeMap = createDeploymentNodePropertiesMap();
        this.deploymentNodesArray.push([deploymentNodeMap]);
        return new DeploymentNode(deploymentNodeMap);
    }

    public addInfrastructureNode() {
        if (!this.propertiesMap.has("infrastructureNodes")) this.propertiesMap.set("infrastructureNodes", new Y.Array<Y.Map<unknown>>());
        const infrastructureNodeMap = createInfrastructureNodePropertiesMap();
        this.infrastructureNodesArray.push([infrastructureNodeMap]);
        return new InfrastructureNode(infrastructureNodeMap);
    }

    public addSoftwareSystemInstance() {
        if (!this.propertiesMap.has("softwareSystemInstances")) this.propertiesMap.set("softwareSystemInstances", new Y.Array<Y.Map<unknown>>());
        const softwareSystemInstanceMap = createSoftwareSystemInstancePropertiesMap();
        this.softwareSystemInstancesArray.push([softwareSystemInstanceMap]);
        return new SoftwareSystemInstance(softwareSystemInstanceMap);
    }

    public addContainerInstance() {
        if (!this.propertiesMap.has("containerInstances")) this.propertiesMap.set("containerInstances", new Y.Array<Y.Map<unknown>>());
        const containerInstanceMap = createContainerInstancePropertiesMap();
        this.containerInstancesArray.push([containerInstanceMap]);
        return new ContainerInstance(containerInstanceMap);
    }

    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const relationshipMap = createRelationshipPropertiesMap();
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}