import { HealthCheck } from "./HealthCheck";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";
export interface ContainerInstance {
    identifier?: Identifier;
    containerIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: Relationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}
export declare function toContainerInstanceString(instance: ContainerInstance): string;
export declare function toContainerInstanceArrayString(instances: ContainerInstance[]): string;
export declare function containerInstance(containerIdentifier: Identifier, identifier: Identifier, deploymentGroups?: Identifier[], tags?: Tag[]): {
    identifier: string;
    containerIdentifier: string;
    deploymentGroups: string[];
    tags: Tag[];
};
//# sourceMappingURL=ContainerInstance.d.ts.map