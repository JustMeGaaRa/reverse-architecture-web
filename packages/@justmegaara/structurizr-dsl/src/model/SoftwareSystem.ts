import { Container, toContainerArrayString } from "./Container";
import { Group } from "./Group";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipArrayString } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Technology } from "./Technology";
import { indent } from "../utils";

export interface SoftwareSystem extends Element {
    identifier: Identifier;
    name: string;
    groups: Group[];
    containers: Container[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}

export function toSoftwareSystemString(software: SoftwareSystem): string {
    const containers = indent(toContainerArrayString(software.containers ?? []));
    const rels = indent(toRelationshipArrayString(software.relationships ?? []));
    return software
        ? `${software.identifier} = softwareSystem "${software.name}" "${software.description ?? ""}" {\n${containers}\n${rels}\n}`
        : "";
}

export function toSoftwareSystemArrayString(softwareSystems: SoftwareSystem[]): string {
    return softwareSystems.map(toSoftwareSystemString).join("\n");
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
        containers: containers ?? [],
        groups: [],
        technology: [],
        tags: [
            Tag.Element,
            Tag.SoftwareSystem,
            ...(tags ?? [])
        ]
    }
}