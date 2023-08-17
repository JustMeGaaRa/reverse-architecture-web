import {
    Component,
    IElement,
    ElementType,
    Group,
    IComponent,
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

export interface IContainer extends IElement {
    type: ElementType.Container;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    components: IComponent[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: IRelationship[];
}

type ContainerParams =
    Required<Pick<IContainer, "name" | "identifier">>
    & Partial<Omit<IContainer, "type" | "name"| "identifier">>;

export class Container implements IElement, ISupportImmutable<IContainer> {
    constructor(params: ContainerParams) {
        this.type = ElementType.Container;
        this.identifier = params.identifier;
        this.name = params.name;
        this.groups = params.groups ? params.groups.map(g => new Group(g)) : [];
        this.components = params.components ? params.components.map(c => new Component(c)) : [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.Container,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.Container.name) ?? []
            )
        ];
    }

    public readonly type: ElementType.Container;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly groups: Group[];
    public readonly components: Component[];
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toObject(): IContainer {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            groups: this.groups.map(g => g.toObject()),
            components: this.components.map(c => c.toObject()),
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

    public addComponent(component: Component, groupId?: Identifier) {
        if (groupId) {
            this.groups.find(g => g.identifier === groupId)?.addComponent(component);
        }
        else {
            this.components.push(component);
        }
    }

    public addRelationship(relationship: Relationship) {
        this.relationships.push(relationship);
    }
}