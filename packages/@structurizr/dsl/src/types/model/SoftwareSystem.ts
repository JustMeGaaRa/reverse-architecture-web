import {
    Container,
    IElement,
    ElementType,
    Group,
    IContainer,
    Identifier,
    IGroup,
    IRelationship,
    ISupportImmutable,
    Perspectives,
    Properties,
    Relationship,
    Tag,
    Technology,
    Url
} from "../..";

export interface ISoftwareSystem extends IElement {
    type: ElementType.SoftwareSystem;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    containers: IContainer[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: IRelationship[];
}

export type SoftwareSystemParams =
    Required<Pick<ISoftwareSystem, "name" | "identifier">>
    & Partial<Omit<ISoftwareSystem, "name"| "identifier">>

export class SoftwareSystem implements IElement, ISupportImmutable<ISoftwareSystem> {
    constructor(params: SoftwareSystemParams) {
        this.type = ElementType.SoftwareSystem;
        this.identifier = params.identifier;
        this.name = params.name;
        this.groups = params.groups ? params.groups.map(g => new Group(g)) : [];
        this.containers = params.containers ? params.containers.map(c => new Container(c)) : [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.SoftwareSystem,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.SoftwareSystem.name) ?? []
            )
        ]
    }

    public readonly type: ElementType.SoftwareSystem;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly groups: Group[];
    public readonly containers: Container[];
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toObject(): ISoftwareSystem {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            groups: this.groups.map(g => g.toObject()),
            containers: this.containers.map(c => c.toObject()),
            technology: this.technology,
            description: this.description,
            tags: this.tags,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toObject())
        }
    }

    public addGroup(group: Group) {
        this.groups.push(group);
    }

    public addContainer(container: Container, groupId?: Identifier) {
        if (groupId) {
            this.groups.find(g => g.identifier === groupId)?.addContainer(container);
        }
        else {
            this.containers.push(container);
        }
    }

    public addRelationship(relationship: Relationship) {
        this.relationships.push(relationship);
    }
}