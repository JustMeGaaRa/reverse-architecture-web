import {
    AutoLayout,
    Container,
    Group,
    IElementPosition,
    IRelationshipPosition,
    ISupportImmutable,
    IViewDefinition,
    Position,
    Properties,
    SoftwareSystem,
    ViewType
} from "../..";

export interface IContainerView extends IViewDefinition {
    type: ViewType;
    identifier: string;
    key?: string;
    include: string[];
    autoLayout?: AutoLayout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

export class ContainerViewDefinition implements IViewDefinition, ISupportImmutable<IContainerView> {
    constructor(values: Omit<IContainerView, "type">) {
        this.type = ViewType.Container;
        this.identifier = values.identifier;
        this.key = values.key;
        this.description = values.description;
        this.include = values.include ?? [];
        this.autoLayout = values.autoLayout;
        this.animation = values.animation;
        this.title = values.title;
        this.properties = values.properties;
        this.elements = values.elements ?? [];
        this.relationships = values.relationships ?? [];
    }

    public readonly type: ViewType;
    public readonly identifier: string;
    public readonly key?: string;
    public readonly include: string[];
    public readonly autoLayout?: AutoLayout;
    public readonly animation?: any;
    public readonly title?: string;
    public readonly description?: string;
    public readonly properties?: Properties;
    public readonly elements: Array<IElementPosition>;
    public readonly relationships: Array<IRelationshipPosition>;

    public toObject(): IContainerView {
        return {
            type: this.type,
            identifier: this.identifier,
            key: this.key,
            include: this.include,
            autoLayout: this.autoLayout,
            animation: this.animation,
            title: this.title,
            description: this.description,
            properties: this.properties,
            elements: this.elements,
            relationships: this.relationships,
        }
    }

    public addGroup(group: Group, position: Position) {
        this.include.push(group.identifier);
        this.elements.push({ id: group.identifier, x: position.x, y: position.y });
    }

    public addSoftwareSystem(softwareSystem: SoftwareSystem, position: Position) {
        this.include.push(softwareSystem.identifier);
        this.elements.push({ id: softwareSystem.identifier, x: position.x, y: position.y });
    }

    public addPerson(person: SoftwareSystem, position: Position) {
        this.include.push(person.identifier);
        this.elements.push({ id: person.identifier, x: position.x, y: position.y });
    }

    public addContainer(container: Container, position: Position) {
        this.include.push(container.identifier);
        this.elements.push({ id: container.identifier, x: position.x, y: position.y });
    }
}