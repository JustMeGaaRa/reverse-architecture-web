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

export interface ISoftwareSystemInstance {
    type: ElementType.SoftwareSystemInstance;
    identifier?: Identifier;
    softwareSystemIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    healthCheck?: HealthCheck;
}

type SoftwareSystemInstanceParams =
    Required<Pick<ISoftwareSystemInstance, "softwareSystemIdentifier">>
    & Partial<Omit<ISoftwareSystemInstance, "softwareSystemIdentifier" | "type">>;

export class SoftwareSystemInstance implements ISupportImmutable<ISoftwareSystemInstance> {
    constructor(params: SoftwareSystemInstanceParams) {
        this.type = ElementType.SoftwareSystemInstance;
        this.identifier = params.identifier;
        this.softwareSystemIdentifier = params.softwareSystemIdentifier;
        this.deploymentGroups = params.deploymentGroups ?? [];
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.healthCheck = params.healthCheck;
        this.tags = [
            Tag.SoftwareSystemInstance,
            ...(params.tags
                ?.filter(x => x.name !== Tag.SoftwareSystemInstance.name) ?? []
            )
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

    public toObject(): ISoftwareSystemInstance {
        return {
            type: this.type,
            identifier: this.identifier,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
            deploymentGroups: this.deploymentGroups,
            relationships: this.relationships?.map(r => r.toObject()),
            description: this.description,
            tags: this.tags,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives,
            healthCheck: this.healthCheck
        }
    }
}