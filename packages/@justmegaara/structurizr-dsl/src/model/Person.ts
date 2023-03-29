import { indent } from "../utils";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipArrayString } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

export interface Person extends Omit<Element, "description" | "technology"> {
    identifier: Identifier;
    name: string;
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}

export function toPersonString(person: Person): string {
    const rels = indent(toRelationshipArrayString(person.relationships ?? []));
    return `${person.identifier} = person "${person.name}" "${person.description ?? ""}" {\n${rels}\n}`;
}

export function toPersonArrayString(persons: Person[]): string {
    return persons.map(toPersonString).join("\n");
}

export function person(
    identifier: Identifier,
    name: string,
    description?: string,
    tags?: Tag[]
): Person {
    return {
        identifier,
        name,
        description,
        tags: [
            Tag.Element,
            Tag.Person,
            ...(tags ?? [])
        ]
    }
}