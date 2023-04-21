import { GenericView } from "./GenericView";
import { Identifier } from "../model/Identifier";
import { SoftwareSystem } from "../model/SoftwareSystem";
import { Person } from "../model/Person";
import { Layout } from "./Layout";

export interface SystemContextView extends GenericView {
    softwareSystemIdentifier: Identifier;
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
}

export function systemContextView(
    softwareSystemIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
    people?: Person[],
    softwareSystems?: SoftwareSystem[]
): SystemContextView {
    return {
        type: "System Context",
        softwareSystemIdentifier,
        identifier: softwareSystemIdentifier,
        key,
        layout,
        title,
        description,
        people: people ?? [],
        softwareSystems: softwareSystems ?? [],
    }
}