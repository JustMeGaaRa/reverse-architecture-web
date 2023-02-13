import { Component } from "./Component";
import { Container } from "./Container";
import { Identifier } from "./Identifier";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

export class Group {
    constructor(identifier: Identifier, name: string) {
        this.identifier = identifier;
        this.name = name;
    }

    identifier!: Identifier;
    name!: string;
    people: Person[];
    softwareSystems: SoftwareSystem[];
    containers: Container[];
    components: Component[];
}