import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
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