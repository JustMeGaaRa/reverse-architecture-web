import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Relationship } from "./Relationship";
import { HealthCheck } from "./HealthCheck";
import { ElementType } from "./ElementType";

type SoftwareSystemInstanceParams =
    Required<Pick<SoftwareSystemInstance, "softwareSystemIdentifier">>
    & Partial<Omit<SoftwareSystemInstance, "softwareSystemIdentifier" | "type">>;

export class SoftwareSystemInstance {
    constructor(params: SoftwareSystemInstanceParams) {
        this.type = ElementType.SoftwareSystemInstance;
        this.identifier = params.identifier;
        this.softwareSystemIdentifier = params.softwareSystemIdentifier;
        this.deploymentGroups = params.deploymentGroups;
        this.relationships = params.relationships;
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.healthCheck = params.healthCheck;
        this.tags = [
            Tag.SoftwareSystemInstance,
            ...(params.tags ?? [])
        ];
    }

    public readonly type: ElementType.SoftwareSystemInstance;
    public readonly identifier?: Identifier;
    public readonly softwareSystemIdentifier: Identifier;
    public readonly deploymentGroups?: Identifier[];
    public readonly relationships?: Relationship[];
    public readonly description?: string;
    public readonly tags?: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly healthCheck?: HealthCheck;
}

export function toSoftwareSystemInstanceString(instance: SoftwareSystemInstance): string {
    return `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`;
}

export function toSoftwareSystemInstanceArrayString(instances: SoftwareSystemInstance[]): string {
    return instances.map(toSoftwareSystemInstanceString).join("\n");
}