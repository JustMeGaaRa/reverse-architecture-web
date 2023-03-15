import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Relationship } from "./Relationship";
import { HealthCheck } from "./HealthCheck";
export interface SoftwareSystemInstance {
    identifier?: Identifier;
    softwareSystemIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: Relationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}
export declare function toSoftwareSystemInstanceString(instance: SoftwareSystemInstance): string;
export declare function toSoftwareSystemInstanceArrayString(instances: SoftwareSystemInstance[]): string;
export declare function softwareSystemInstance(softwareSystemIdentifier: Identifier, identifier?: Identifier, deploymentGroups?: Identifier[], tags?: Tag[]): {
    identifier: string;
    softwareSystemIdentifier: string;
    deploymentGroups: string[];
    tags: Tag[];
};
//# sourceMappingURL=SoftwareSystemInstance.d.ts.map