import {
    ElementType,
    HealthCheck,
    Identifier,
    IRelationship,
    ISupportImmutable,
    Perspectives,
    Properties,
    Relationship,
    Tag,
    Url
} from "../..";

export interface IContainerInstance {
    type: ElementType.ContainerInstance;
    identifier?: Identifier;
    containerIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}

type ContainerInstanceParams =
    Required<Pick<IContainerInstance, "containerIdentifier">>
    & Partial<Omit<IContainerInstance, "containerIdentifier" | "type">>;

export class ContainerInstance implements ISupportImmutable<IContainerInstance> {
    constructor(params: ContainerInstanceParams) {
        this.type = ElementType.ContainerInstance;
        this.identifier = params.identifier;
        this.containerIdentifier = params.containerIdentifier;
        this.deploymentGroups = params.deploymentGroups ?? [];
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.healthCheck = params.healthCheck;
        this.tags = [
            Tag.ContainerInstance,
            ...(params.tags
                ?.filter(x => x.name !== Tag.ContainerInstance.name) ?? []
            )
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

    public toObject(): IContainerInstance {
        return {
            type: this.type,
            identifier: this.identifier,
            containerIdentifier: this.containerIdentifier,
            deploymentGroups: this.deploymentGroups,
            relationships: this.relationships,
            description: this.description,
            tags: this.tags,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives,
            healthCheck: this.healthCheck
        }
    }
}