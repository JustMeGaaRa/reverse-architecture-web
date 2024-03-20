import { Identifier, IDeploymentEnvironment, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { DeploymentNode } from "./DeploymentNode";
import { Relationship } from "./Relationship";

export class DeploymentEnvironment implements ISupportSnapshot<IDeploymentEnvironment> {
    private get deploymentNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentNodes") as Y.Array<Y.Map<unknown>>; }
    private get relationshipsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("relationships") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public set deploymentGroups(value: Array<string>) { this.propertiesMap.set("deploymentGroups", value); }

    public get deploymentNodes(): Array<DeploymentNode> { return this.deploymentNodesArray?.map(node => new DeploymentNode(node)); }
    public get relationships(): Array<Relationship> { return this.relationshipsArray.map(relationship => new Relationship(relationship)); }

    public fromSnapshot(deploymentEnvironment: IDeploymentEnvironment) {
        this.identifier = deploymentEnvironment.identifier;
        this.name = deploymentEnvironment.name;
        this.deploymentGroups = deploymentEnvironment.deploymentGroups;
        deploymentEnvironment.deploymentNodes?.forEach(deploymentNode => this.addDeploymentNode().fromSnapshot(deploymentNode));
        deploymentEnvironment.relationships?.forEach(relationship => this.addRelationship().fromSnapshot(relationship));
    }

    public toSnapshot(): IDeploymentEnvironment {
        return Object.freeze({
            identifier: this.identifier,
            name: this.name,
            deploymentNodes: this.deploymentNodes?.map(deploymentNode => deploymentNode.toSnapshot()),
            deploymentGroups: this.deploymentGroups ?? [],
            relationships: this.relationships?.map(relationship => relationship.toSnapshot())
        });
    }

    public addDeploymentNode() {
        if (!this.propertiesMap.has("deploymentNodes")) this.propertiesMap.set("deploymentNodes", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const deploymentNodeMap = new Y.Map([
            ["identifier", uniqueId],
            ["name", ""],
            ["description", ""],
            ["technology", []],
            ["instances", 1],
            ["tags", []],
            ["url", ""]
        ]);
        this.deploymentNodesArray.push([deploymentNodeMap]);
        return new DeploymentNode(deploymentNodeMap);
    }
    
    public addRelationship() {
        if (!this.propertiesMap.has("relationships")) this.propertiesMap.set("relationships", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const relationshipMap = new Y.Map([
            ["sourceIdentifier", ""],
            ["targetIdentifier", ""],
            ["description", ""],
            ["technology", []],
            ["tags", []],
            ["url", ""]
        ]);
        this.relationshipsArray.push([relationshipMap]);
        return new Relationship(relationshipMap);
    }
}
