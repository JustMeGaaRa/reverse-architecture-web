import { Relationship } from "./Relationship";
import { SoftwareSystem } from "./SoftwareSystem";
import { Person } from "./Person";
import { Group } from "./Group";


export class Enterprise {
    constructor(name?: string) {
        this.name = name;
    }

    name?: string;
    groups: Group[];
    people: Person[];
    softwareSystems: SoftwareSystem[];
    relationships: Relationship[];
}
