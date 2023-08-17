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
    Person,
    ISupportImmutable,
} from "../..";

export interface ISystemLandscapeView extends IViewDefinition {
    type: ViewType;
    identifier: string;
    key?: string;
    description?: string;
    include: string[];
    autoLayout?: AutoLayout;
    animation?: any;
    title?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

type SystemLandscapeViewDefinitionValues =
    Required<Pick<ISystemLandscapeView, "identifier">>
    & Partial<Omit<ISystemLandscapeView, "type" | "identifier">>;

export class SystemLandscapeViewDefinition implements IViewDefinition, ISupportImmutable<ISystemLandscapeView> {
    constructor(values: SystemLandscapeViewDefinitionValues) {
        this.type = ViewType.SystemLandscape;
        this.identifier = "System Landscape";
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
    public readonly description?: string;
    public readonly include: string[];
    public readonly autoLayout?: AutoLayout;
    public readonly animation?: any;
    public readonly title?: string;
    public readonly properties?: Properties;
    public readonly elements: Array<IElementPosition>;
    public readonly relationships: Array<IRelationshipPosition>;

    public toObject(): ISystemLandscapeView {
        return {
            type: this.type,
            identifier: this.identifier,
            key: this.key,
            description: this.description,
            include: this.include,
            autoLayout: this.autoLayout,
            animation: this.animation,
            title: this.title,
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

    public addPerson(person: Person, position: Position) {
        this.include.push(person.identifier);
        this.elements.push({ id: person.identifier, x: position.x, y: position.y });
    }
}