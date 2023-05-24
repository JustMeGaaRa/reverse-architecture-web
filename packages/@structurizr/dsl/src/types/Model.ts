import { Relationship } from "./model/Relationship";
import { DeploymentEnvironment } from "./model/DeploymentEnvironment";
import { SoftwareSystem } from "./model/SoftwareSystem";
import { Person } from "./model/Person";
import { Group } from "./model/Group";

type ModelParams = Partial<Model>;

export class Model {
    constructor(
        params: ModelParams
    ) {
        this.people = params.people ?? [];
        this.softwareSystems = params.softwareSystems ?? [];
        this.deploymentEnvironments = params.deploymentEnvironments ?? [];
        this.relationships = params.relationships ?? [];
        this.groups = params.groups ?? [];
    }

    public readonly people: Person[];
    public readonly softwareSystems: SoftwareSystem[];
    public readonly deploymentEnvironments: DeploymentEnvironment[];
    public readonly relationships: Relationship[];
    public readonly groups: Group[];
}