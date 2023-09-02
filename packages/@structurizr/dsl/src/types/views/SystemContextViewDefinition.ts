import {
    IElementPosition,
    IRelationshipPosition,
    IViewDefinition,
    AutoLayout,
    Position,
    Properties,
    SoftwareSystem,
    ViewType,
    Group,
    ISupportImmutable,
    Person,
    Identifier,
    All,
    IAutoLayout,
} from "../..";

export interface ISystemContextView extends IViewDefinition {
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

type SystemContextViewDefinitionValues =
    Required<Pick<ISystemContextView, "identifier">>
    & Partial<Omit<ISystemContextView, "type" | "identifier">>;

export class SystemContextViewDefinition implements IViewDefinition, ISupportImmutable<ISystemContextView> {
    constructor(values: SystemContextViewDefinitionValues) {
        this.type = ViewType.SystemContext;
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

    public toObject(): ISystemContextView {
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

    public setElementPosition(elementId: string, position: Position) {
        this.elements = this.elements
            .map(element => element.id === elementId ? { ...element, ...position } : element);
    }

    public setRelationshipPosition(relationshipId: string) {
        this.relationships = [
            ...this.relationships.filter(x => x.id !== relationshipId),
            { id: relationshipId }
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

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}