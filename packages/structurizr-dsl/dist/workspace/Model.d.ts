/// <reference types="react" />
import { Relationship } from "../model/Relationship";
import { DeploymentEnvironment } from "../model/DeploymentEnvironment";
import { SoftwareSystem } from "../model/SoftwareSystem";
import { Person } from "../model/Person";
import { Group } from "../model/Group";
import { Enterprise } from "../model/Enterprise";
export interface Model {
    people: Person[];
    softwareSystems: SoftwareSystem[];
    deploymentEnvironments: DeploymentEnvironment[];
    relationships: Relationship[];
    enterprise?: Enterprise;
    groups: Group[];
    elements: Element[];
}
export declare function toModelString(model: Model): string;
export declare function model(people?: Person[], softwareSystems?: SoftwareSystem[], deploymentEnvironments?: DeploymentEnvironment[], relationships?: Relationship[], enterprise?: Enterprise, groups?: Group[], elements?: Element[]): Model;
//# sourceMappingURL=Model.d.ts.map