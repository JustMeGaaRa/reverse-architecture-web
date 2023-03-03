import { indent } from "../utils";
import { Component, toComponentArrayString } from "./Component";
import { Element } from "./Element";
import { Group } from "./Group";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipArrayString } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

export interface Container extends Element {
    identifier: Identifier;
    name: string;
    groups?: Group[];
    components?: Component[];
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}

export function toContainerString(container: Container): string {
    const components = indent(toComponentArrayString(container.components ?? []));
    const rels = indent(toRelationshipArrayString(container.relationships ?? []));
    return container
        ? `${container.identifier} = container "${container.name}" "${container.description ?? ""}" {\n${components}\n${rels}\n}`
        : "";
}

export function toContainerArrayString(containers: Container[]): string {
    return containers.map(toContainerString).join("\n");
}

export function container(
    identifier: Identifier,
    name: string,
    description?: string,
    technology?: Technology[],
    components?: Component[],
    tags?: Tag[]
): Container {
    return {
        identifier,
        name,
        description,
        technology,
        components,
        tags: [
            Tag.Element,
            Tag.Container,
            ...(tags ?? [])
        ]
    }
}
