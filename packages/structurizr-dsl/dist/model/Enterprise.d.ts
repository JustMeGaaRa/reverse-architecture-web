import { Relationship } from "./Relationship";
import { SoftwareSystem } from "./SoftwareSystem";
import { Person } from "./Person";
import { Group } from "./Group";
export interface Enterprise {
    name?: string;
    groups: Group[];
    people: Person[];
    softwareSystems: SoftwareSystem[];
    relationships: Relationship[];
}
export declare function toEnterpriseString(enterprise?: Enterprise): string;
export declare function enterprise(name: string, people?: Person[], softwareSystems?: SoftwareSystem[]): Enterprise;
//# sourceMappingURL=Enterprise.d.ts.map