import { Container } from "./Container";
import { Group } from "./Group";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";

export interface SoftwareSystem extends Element {
    identifier: Identifier;
    name: string;
    groups?: Group[];
    containers?: Container[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}

export function softwareSystem(
    identifier: Identifier,
    name: string,
    description?: string,
    containers?: Container[],
    tags?: Tag[]
): SoftwareSystem {
    return {
        identifier,
        name,
        description,
        containers,
        tags: [
            Tag.Element,
            Tag.SoftwareSystem,
            ...(tags ?? [])
        ]
    }
}