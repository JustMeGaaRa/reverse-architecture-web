import { Relationship, toRelationshipString } from "./Relationship";
import { SoftwareSystem, toSoftwareSystemString } from "./SoftwareSystem";
import { Person, toPersonString } from "./Person";
import { Group } from "./Group";

export interface Enterprise {
    name?: string;
    groups: Group[];
    people: Person[];
    softwareSystems: SoftwareSystem[];
    relationships: Relationship[];
}

export function toEnterpriseString(enterprise?: Enterprise): string {
    return enterprise ? `enterprise "${enterprise.name}" {
        ${enterprise.people.map(toPersonString).join("\n")}
        ${enterprise.softwareSystems.map(toSoftwareSystemString).join("\n")}
        ${enterprise.relationships.map(toRelationshipString).join("\n")}
    }` : "";
}

export function enterprise(
    name: string,
    people?: Person[],
    softwareSystems?: SoftwareSystem[]
): Enterprise {
    return {
        name,
        people: people ?? [],
        softwareSystems: softwareSystems ?? [],
        groups: [],
        relationships: []
    }
}