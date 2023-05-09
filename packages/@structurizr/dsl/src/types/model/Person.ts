import { indent } from "../../utils/Formatting";
import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipArrayString } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

type PersonParams = 
    Required<Pick<Person, "identifier" | "name">>
    & Partial<Omit<Person, "identifier" | "name" | "type">>;

export class Person implements Omit<Element, "description" | "technology"> {
    constructor(params: PersonParams) {
        this.type = ElementType.Person;
        this.identifier = params.identifier;
        this.name = params.name;
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships;
        this.tags = [
            Tag.Element,
            Tag.Person,
            ...(params.tags ?? [])
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
}

export function toPersonString(person: Person): string {
    const rels = indent(toRelationshipArrayString(person.relationships ?? []));
    return `${person.identifier} = person "${person.name}" "${person.description ?? ""}" {\n${rels}\n}`;
}

export function toPersonArrayString(persons: Person[]): string {
    return persons.map(toPersonString).join("\n");
}