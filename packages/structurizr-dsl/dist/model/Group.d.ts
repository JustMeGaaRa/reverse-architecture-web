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
export declare function group(identifier: Identifier, name: string): Group;
//# sourceMappingURL=Group.d.ts.map