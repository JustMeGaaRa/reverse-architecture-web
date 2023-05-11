import { Component } from "./Component";
import { Container } from "./Container";
import { Identifier } from "./Identifier";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

type GroupParams =
    Required<Pick<Group, "identifier" | "name">>
    & Partial<Omit<Group, "identifier" | "name">>;

export class Group {
    constructor(
        params: GroupParams
    ) {
        this.identifier = params.identifier;
        this.name = params.name;
        this.people = params.people ?? [];
        this.softwareSystems = params.softwareSystems ?? [];
        this.containers = params.containers ?? [];
        this.components = params.components ?? [];
    }

    public readonly identifier: Identifier;
    public readonly name: string;
    public readonly people: Array<Person>;
    public readonly softwareSystems: Array<SoftwareSystem>;
    public readonly containers: Array<Container>;
    public readonly components: Array<Component>;
}