import { IComponentView, IElementPosition, IRelationshipPosition, ISupportSnapshot, IViewDefinition, IViewDefinitionMetadata } from "../interfaces";
import { AutoLayout } from "./AutoLayout";
import { AutoLayoutDirection } from "./AutoLayoutDirection";
import { Component } from "./Component";
import { Container } from "./Container";
import { Group } from "./Group";
import { All, Identifier } from "./Identifier";
import { Person } from "./Person";
import { Position } from "./Position";
import { SoftwareSystem } from "./SoftwareSystem";
import { ViewType } from "./ViewType";

type ComponentViewValues =
    Required<Pick<IComponentView, "identifier">>
    & Partial<Omit<IComponentView, "type" | "identifier">>;

export class ComponentViewDefinition implements IViewDefinition, ISupportSnapshot<IComponentView> {
    constructor(values: ComponentViewValues) {
        this.type = ViewType.Component;
        this.identifier = values.identifier;
        this.key = values.key;
        this.description = values.description;
        this.include = values.include ?? [];
        this.exclude = values.exclude ?? [];
        this.autoLayout = values.autoLayout ? new AutoLayout(values.autoLayout) : undefined;
        this.animation = values.animation;
        this.title = values.title;
        // this.properties = values.properties;
        this.elements = values.elements ?? [];
        this.relationships = values.relationships ?? [];
    }

    public type: ViewType;
    public identifier: string;
    public key?: string;
    public include: Array<Identifier | All>;
    public exclude: Array<Identifier>;
    public autoLayout?: AutoLayout;
    public animation?: any;
    public title?: string;
    public description?: string;
    // public properties?: Properties;
    public elements: Array<IElementPosition>;
    public relationships: Array<IRelationshipPosition>;

    public static default(containerIdentifier: Identifier) {
        return new ComponentViewDefinition({
            identifier: containerIdentifier,
            key: "default_system_landscape",
            title: "System Landscape",
            autoLayout: { direction: AutoLayoutDirection.TopBotom, rankSeparation: 300, nodeSeparation: 300 },
        });
    }

    public toSnapshot(): IComponentView {
        return {
            type: this.type,
            identifier: this.identifier,
            key: this.key,
            include: this.include,
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation,
            title: this.title,
            description: this.description,
            // properties: this.properties,
            elements: this.elements,
            relationships: this.relationships,
        }
    }

    public applyMetadata(metadata: IViewDefinitionMetadata) {
        metadata.elements?.forEach(element => this.elements.push(element));
        metadata.relationships?.forEach(relationship => this.relationships.push(relationship));
    }

    public setElementPosition(elementId: string, position: Position) {
        this.elements = this.elements
            .map(element => element.id === elementId ? { ...element, ...position } : element);
    }

    public setRelationshipPosition(relationshipId: string) {
        this.relationships = [
            ...this.relationships.filter(x => x.id !== relationshipId),
            { id: relationshipId, x: 0, y: 0 }
        ]
    }

    public addGroup(group: Group, position: Position) {
        this.include.push(group.identifier);
        this.elements.push({ id: group.identifier, x: position.x, y: position.y });
    }

    public addSoftwareSystem(softwareSystem: SoftwareSystem, position: Position) {
        this.include.push(softwareSystem.identifier);
        this.elements.push({ id: softwareSystem.identifier, x: position.x, y: position.y });
    }

    public addPerson(person: Person, position: Position) {
        this.include.push(person.identifier);
        this.elements.push({ id: person.identifier, x: position.x, y: position.y });
    }

    public addContainer(container: Container, position: Position) {
        this.include.push(container.identifier);
        this.elements.push({ id: container.identifier, x: position.x, y: position.y });
    }

    public addComponent(component: Component, position: Position) {
        this.include.push(component.identifier);
        this.elements.push({ id: component.identifier, x: position.x, y: position.y });
    }

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}