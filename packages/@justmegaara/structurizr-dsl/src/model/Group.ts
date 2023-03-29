import { Component } from "./Component";
import { Container } from "./Container";
import { Identifier } from "./Identifier";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

export interface Group {
    identifier: Identifier;
    name: string;
    people: Person[];
    softwareSystems: SoftwareSystem[];
    containers: Container[];
    components: Component[];
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
        components: []
    }
}