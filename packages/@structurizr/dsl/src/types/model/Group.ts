import { Component } from "./Component";
import { Container } from "./Container";
import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Identifier } from "./Identifier";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";
import { Tag } from "./Tag";

type GroupParams =
    Required<Pick<Group, "identifier" | "name">>
    & Partial<Omit<Group, "identifier" | "name" | "type">>;

export class Group implements Element {
    constructor(
        params: GroupParams
    ) {
        this.type = ElementType.Group;
        this.identifier = params.identifier;
        this.name = params.name;
        this.people = params.people ?? [];
        this.softwareSystems = params.softwareSystems ?? [];
        this.containers = params.containers ?? [];
        this.components = params.components ?? [];
        this.tags = [
            Tag.Element,
            Tag.Group,
            ...(params.tags ?? [])
        ];
    }

    public readonly type: ElementType.Group;
    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly tags: Tag[];
    public readonly people: Array<Person>;
    public readonly softwareSystems: Array<SoftwareSystem>;
    public readonly containers: Array<Container>;
    public readonly components: Array<Component>;
}