import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";

type ComponentParams =
    Required<Pick<Component, "identifier" | "name">>
    & Partial<Omit<Component, "identifier" | "name" | "type">>;

export class Component implements Element {
    constructor(params: ComponentParams) {
        this.type = ElementType.Component;
        this.identifier = params.identifier;
        this.name = params.name;
        this.technology = params.technology;
        this.description = params.description;
        this.url = params.url;
        this.properties = params.properties;
        this.perspectives = params.perspectives;
        this.relationships = params.relationships;
        this.tags = [
            Tag.Element,
            Tag.Component,
            ...(params.tags ?? [])
        ]
    }

    public readonly type: ElementType.Component;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly technology: Technology[];
    public readonly description?: string;
    public readonly tags: Tag[];
    public readonly url?: Url;
    public readonly properties?: Properties;
    public readonly perspectives?: Perspectives;
    public readonly relationships: Relationship[];
}