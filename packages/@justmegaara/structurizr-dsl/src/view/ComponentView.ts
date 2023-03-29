import { GenericView } from "./GenericView";
import { Identifier } from "../model/Identifier";
import { SoftwareSystem } from "../model/SoftwareSystem";
import { Person } from "../model/Person";
import { Container } from "../model/Container";
import { Component } from "../model/Component";
import { Layout } from "./Layout";

export interface ComponentView extends GenericView {
    containerIdentifier: Identifier;
    components?: Component[];
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
    containers?: Container[];
}

export function componentView(
    containerIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
    components?: Component[],
    people?: Person[],
    softwareSystems?: SoftwareSystem[],
    containers?: Container[]
): ComponentView {
    return {
        containerIdentifier,
        key,
        layout,
        title,
        description,
        components,
        people,
        softwareSystems,
        containers
    }
}