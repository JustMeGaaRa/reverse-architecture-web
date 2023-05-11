import { Relationship, toRelationshipArrayString } from "./model/Relationship";
import { DeploymentEnvironment, toDeploymentEnvironmentArrayString } from "./model/DeploymentEnvironment";
import { SoftwareSystem, toSoftwareSystemArrayString } from "./model/SoftwareSystem";
import { Person, toPersonArrayString } from "./model/Person";
import { Group } from "./model/Group";
import { indent } from "../utils/Formatting";

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

export function toModelString(model: Model): string {
    const people = indent(toPersonArrayString(model.people ?? []));
    const softwareSystems = indent(toSoftwareSystemArrayString(model.softwareSystems ?? []));
    const environments = indent(toDeploymentEnvironmentArrayString(model.deploymentEnvironments ?? []));
    const relationships = indent(toRelationshipArrayString(model.relationships ?? []));
    return `model {\n${people}\n${softwareSystems}\n${environments}\n${relationships}\n}`;
}