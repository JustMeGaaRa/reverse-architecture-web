import {
    IElementPosition,
    IRelationshipPosition,
    IViewDefinition,
    AutoLayout,
    Position,
    Properties,
    SoftwareSystem,
    Group,
    Person,
    ISupportImmutable,
    Identifier,
    All,
    IAutoLayout,
    AutoLayoutDirection,
    IViewDefinitionMetadata,
} from "../..";
import { ViewType } from "./ViewType";

export interface ISystemLandscapeView extends IViewDefinition {
    type: ViewType;
    identifier: Identifier;
    key?: string;
    description?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
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
        this.exclude = values.exclude ?? [];
        this.autoLayout = values.autoLayout ? new AutoLayout(values.autoLayout) : undefined;
        this.animation = values.animation;
        this.title = values.title;
        this.properties = values.properties;
        this.elements = values.elements ?? [];
        this.relationships = values.relationships ?? [];
    }

    public type: ViewType;
    public identifier: Identifier;
    public key?: string;
    public description?: string;
    public include: Array<Identifier | All>;
    public exclude: Array<Identifier>;
    public autoLayout?: AutoLayout;
    public animation?: any;
    public title?: string;
    public properties?: Properties;
    public elements: Array<IElementPosition>;
    public relationships: Array<IRelationshipPosition>;

    public static default() {
        return new SystemLandscapeViewDefinition({
            identifier: undefined,
            key: "default_system_landscape",
            title: "System Landscape",
            autoLayout: { direction: AutoLayoutDirection.TopBotom, rankSeparation: 300, nodeSeparation: 300 },
        });
    }

    public toObject(): ISystemLandscapeView {
        return {
            type: this.type,
            identifier: this.identifier,
            key: this.key,
            description: this.description,
            include: this.include,
            autoLayout: this.autoLayout?.toObject(),
            animation: this.animation,
            title: this.title,
            properties: this.properties,
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