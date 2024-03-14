import { Identifier, IDeploymentEnvironment, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";
import { DeploymentNode } from "./DeploymentNode";
import { Relationship } from "./Relationship";

export class DeploymentEnvironment implements ISupportSnapshot<IDeploymentEnvironment> {
    private get deploymentNodesArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentNodes") as Y.Array<Y.Map<unknown>>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get deploymentNodes(): Array<DeploymentNode> { return this.deploymentNodesArray?.map(node => new DeploymentNode(node)); }
    public get deploymentGroups(): Array<string> { return this.propertiesMap.get("deploymentGroups") as Array<string>; }
    public get relationships(): Array<Relationship> { return this.propertiesMap.get("relationships") as Array<Relationship>; }

    public toSnapshot(): IDeploymentEnvironment {
        return Object.freeze({
            identifier: this.identifier,
            name: this.name,
            deploymentNodes: this.deploymentNodes?.map(deploymentNode => deploymentNode.toSnapshot()),
            deploymentGroups: this.deploymentGroups ?? [],
            relationships: this.relationships?.map(relationship => relationship.toSnapshot())
        });
    }
}
