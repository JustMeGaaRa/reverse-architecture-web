import { Component } from "./Component";
import { Container } from "./Container";
import { Person } from "./Person";
import { SoftwareSystem } from "./SoftwareSystem";

type GroupElementArray = Array<Person | SoftwareSystem> | Array<Container> | Array<Component>;

export interface Group {
    name: string;
    elements: GroupElementArray;
}

export function group(
    name: string
): Group {
    return {
        name,
        elements: [],
    }
}