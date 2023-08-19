import {
    All,
    AutoLayout,
    Container,
    Group,
    IAutoLayout,
    Identifier,
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
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

type ContainerViewValues =
    Required<Pick<IContainerView, "identifier">>
    & Partial<Omit<IContainerView, "type" | "identifier">>;

export class ContainerViewDefinition implements IViewDefinition, ISupportImmutable<IContainerView> {
    constructor(values: ContainerViewValues) {
        this.type = ViewType.Container;
        this.identifier = values.identifier;
        this.key = values.key;
        this.description = values.description;
        this.include = values.include ?? [];
        this.exclude = values.exclude ?? [];
        this.autoLayout = values.autoLayout ? new AutoLayout(values.autoLayout) : undefined;
        this.animation = values.animation;
        this.title = values.title;
        this.properties = values.properties;
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
    public properties?: Properties;
    public elements: Array<IElementPosition>;
    public relationships: Array<IRelationshipPosition>;

    public toObject(): IContainerView {
        return {
            type: this.type,
            identifier: this.identifier,
            key: this.key,
            include: this.include,
            autoLayout: this.autoLayout?.toObject(),
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

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}