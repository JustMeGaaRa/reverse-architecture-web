import { Container } from "./Container";
import { Group } from "./Group";
import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type SoftwareSystemParams =
    Required<Pick<SoftwareSystem, "identifier" | "name">>
    & Partial<Omit<SoftwareSystem, "identifier" | "name" | "type">>;

export class SoftwareSystem implements Element {
    constructor(params: SoftwareSystemParams) {
        this.type = ElementType.SoftwareSystem;
        this.identifier = params.identifier;
        this.name = params.name;
        this.groups = params.groups ?? [];
        this.containers = params.containers ?? [];
        this.technology = params.technology ?? [];
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships ?? [];
        this.tags = [
            Tag.Element,
            Tag.SoftwareSystem,
            ...(params.tags ?? [])
        ]
    }

    public readonly type: ElementType.SoftwareSystem;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly groups: Group[];
    public readonly containers: Container[];
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];
}