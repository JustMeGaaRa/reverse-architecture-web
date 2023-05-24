import { DeploymentGroup } from "./DeploymentGroup";
import { DeploymentNode } from "./DeploymentNode";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Relationship } from "./Relationship";

type DeploymentEnvironmentParams =
    Required<Pick<DeploymentEnvironment, "identifier" | "name" | "deploymentNodes">>
    & Partial<Omit<DeploymentEnvironment, "identifier" | "name" | "deploymentNodes" | "type">>;

export class DeploymentEnvironment {
    constructor(params: DeploymentEnvironmentParams) {
        this.type = ElementType.DeploymentEnvironment;
        this.identifier = params.identifier;
        this.name = params.name;
        this.deploymentGroups = params.deploymentGroups ?? [];
        this.deploymentNodes = params.deploymentNodes ?? [];
        this.relationships = params.relationships ?? [];
    }

    public readonly type: ElementType.DeploymentEnvironment;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly deploymentGroups: DeploymentGroup[];
    public readonly deploymentNodes: DeploymentNode[];
    public readonly relationships: Relationship[];
}