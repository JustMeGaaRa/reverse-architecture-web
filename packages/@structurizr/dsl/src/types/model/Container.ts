import { indent } from "../../utils/Formatting";
import { Component, toComponentArrayString } from "./Component";
import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Group } from "./Group";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship, toRelationshipArrayString } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type ContainerParams =
    Required<Pick<Container, "identifier" | "name">>
    & Partial<Omit<Container, "identifier" | "name" | "type">>;

export class Container implements Element {
    constructor(params: ContainerParams) {
        this.type = ElementType.Container;
        this.identifier = params.identifier;
        this.name = params.name;
        this.groups = params.groups ?? [];
        this.components = params.components ?? [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ?? [];
        this.tags = [
            Tag.Element,
            Tag.Container,
            ...(params.tags ?? [])
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