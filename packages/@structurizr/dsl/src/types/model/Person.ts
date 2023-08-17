import {
    IElement,
    ElementType,
    Identifier,
    IRelationship,
    ISupportImmutable,
    Perspectives,
    Properties,
    Relationship,
    Tag,
    Url
} from "../..";

export interface IPerson extends IElement {
    type: ElementType.Person;
    identifier: Identifier;
    name: string;
    tags: Tag[];
    description?: string;
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: IRelationship[];
}

type PersonParams =
    Required<Pick<IPerson, "name" | "identifier">>
    & Partial<Omit<IPerson, "type" | "name" | "identifier">>;

export class Person implements Omit<IElement, "technology">, ISupportImmutable<IPerson> {
    constructor(params: PersonParams) {
        this.type = ElementType.Person;
        this.identifier = params.identifier;
        this.name = params.name;
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ? params.relationships.map(r => new Relationship(r)) : [];
        this.tags = [
            Tag.Element,
            Tag.Person,
            ...(params.tags
                ?.filter(x => x.name !== Tag.Element.name)
                ?.filter(x => x.name !== Tag.Person.name) ?? []
            )
        ]
    }

    public readonly type: ElementType.Person;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly tags: Tag[];
    public readonly description?: string;
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];

    public toObject(): IPerson {
        return {
            type: this.type,
            identifier: this.identifier,
            name: this.name,
            tags: this.tags,
            description: this.description,
            url: this.url,
            properties: this.properties,
            perspectives: this.perspectives,
            relationships: this.relationships.map(r => r.toObject())
        }
    }
}