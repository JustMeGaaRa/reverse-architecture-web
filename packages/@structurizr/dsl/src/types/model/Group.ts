import { Component } from "./Component";
import { Container } from "./Container";
import { Identifier } from "./Identifier";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

export interface Group {
    identifier: Identifier;
    name: string;
    people: Array<Person>;
    softwareSystems: Array<SoftwareSystem>;
    containers: Array<Container>;
    components: Array<Component>;
}

export function group(
    identifier: Identifier,
    name: string
): Group {
    return {
        identifier,
        name,
        people: [],
        softwareSystems: [],
        containers: [],
        components: [],
    }
}