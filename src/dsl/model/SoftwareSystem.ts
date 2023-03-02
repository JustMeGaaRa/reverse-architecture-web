import { Container, toContainerString } from "./Container";
import { Group } from "./Group";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipString } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Technology } from "./Technology";

export interface SoftwareSystem extends Element {
    identifier: Identifier;
    name: string;
    groups?: Group[];
    containers?: Container[];
    technology?: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}

export function toSoftwareSystemString(software: SoftwareSystem): string {
    return software ? `${software.identifier} = softwareSystem "${software.name}" "${software.description ?? ""}" {
        \t${software.containers?.map(toContainerString).join("\n") ?? ""}
        \t${software.relationships?.map(toRelationshipString).join("\n") ?? ""}
    }` : "";
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