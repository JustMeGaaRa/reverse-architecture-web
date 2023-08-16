import {
    DeploymentGroup,
    DeploymentNode,
    Identifier,
    IDeploymentNode,
    IRelationship,
    ISupportImmutable,
    Relationship
} from "../..";

export interface IDeploymentEnvironment {
    identifier: Identifier;
    name: string;
    deploymentGroups: DeploymentGroup[];
    deploymentNodes: IDeploymentNode[];
    relationships: IRelationship[];
}

type DeploymentEnvironmentParams =
    Required<Pick<IDeploymentEnvironment, "identifier" | "name" | "deploymentNodes">>
    & Partial<Omit<IDeploymentEnvironment, "identifier" | "name" | "deploymentNodes" | "type">>;

export class DeploymentEnvironment implements ISupportImmutable<IDeploymentEnvironment> {
    constructor(params: DeploymentEnvironmentParams) {
        this.identifier = params.identifier;
        this.name = params.name;
        this.deploymentGroups = params.deploymentGroups ?? [];
        this.deploymentNodes = params.deploymentNodes ? params.deploymentNodes.map(n => new DeploymentNode(n)) : [];
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
    }
    
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly deploymentGroups: DeploymentGroup[];
    public readonly deploymentNodes: DeploymentNode[];
    public readonly relationships: Relationship[];

    public toObject(): IDeploymentEnvironment {
        return {
            identifier: this.identifier,
            name: this.name,
            deploymentGroups: this.deploymentGroups,
            deploymentNodes: this.deploymentNodes.map(n => n.toObject()),
            relationships: this.relationships.map(r => r.toObject())
        }
    }
}