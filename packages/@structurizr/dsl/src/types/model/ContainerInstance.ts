import { ElementType } from "./ElementType";
import { HealthCheck } from "./HealthCheck";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

type ContainerInstanceParams =
    Required<Pick<ContainerInstance, "containerIdentifier">>
    & Partial<Omit<ContainerInstance, "containerIdentifier" | "type">>;

export class ContainerInstance {
    constructor(params: ContainerInstanceParams) {
        this.type = ElementType.ContainerInstance;
        this.identifier = params.identifier;
        this.containerIdentifier = params.containerIdentifier;
        this.deploymentGroups = params.deploymentGroups;
        this.relationships = params.relationships;
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.healthCheck = params.healthCheck;
        this.tags = [
            Tag.ContainerInstance,
            ...(params.tags ?? [])
        ];
    }

    public readonly type: ElementType.ContainerInstance;
    public readonly identifier?: Identifier;
    public readonly containerIdentifier: Identifier;
    public readonly deploymentGroups?: Identifier[];
    public readonly relationships?: Relationship[];
    public readonly description?: string;
    public readonly tags?: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly healthCheck?: HealthCheck;
}