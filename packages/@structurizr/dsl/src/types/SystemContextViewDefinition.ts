import { ISupportSnapshot, ISystemContextView, IViewDefinitionMetadata } from "../interfaces";
import { AutoLayout } from "./AutoLayout";
import { ElementMetadata } from "./ElementMetadata";
import { Group } from "./Group";
import { All, Identifier } from "./Identifier";
import { Person } from "./Person";
import { Position } from "./Position";
import { RelationshipMetadata } from "./RelationshipMetadata";
import { SoftwareSystem } from "./SoftwareSystem";
import { ViewType } from "./ViewType";

type SystemContextViewDefinitionValues =
    Required<Pick<ISystemContextView, "key">>
    & Partial<Omit<ISystemContextView, "type">>;

export class SystemContextViewDefinition implements ISupportSnapshot<ISystemContextView> {
    constructor(values: SystemContextViewDefinitionValues) {
        this.type = ViewType.SystemContext;
        this.softwareSystemIdentifier = values.softwareSystemIdentifier;
        this.key = values.key;
        this.description = values.description;
        this.include = values.include ?? [];
        this.exclude = values.exclude ?? [];
        this.autoLayout = values.autoLayout ? new AutoLayout(values.autoLayout) : new AutoLayout();
        this.animation = values.animation;
        this.title = values.title;
        // this.properties = values.properties;
        this.elements = values.elements ? values.elements.map(x => new ElementMetadata(x)) : [];
        this.relationships = values.relationships ? values.relationships.map(x => new RelationshipMetadata(x)) : [];
    }

    public type: ViewType.SystemContext;
    public softwareSystemIdentifier: string;
    public key: string;
    public include: Array<Identifier | All>;
    public exclude: Array<Identifier>;
    public autoLayout?: AutoLayout;
    public animation?: any;
    public title?: string;
    public description?: string;
    // public properties?: Properties;
    public elements: Array<ElementMetadata>;
    public relationships: Array<RelationshipMetadata>;

    public toSnapshot(): ISystemContextView {
        return {
            type: this.type,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
            key: this.key,
            include: this.include,
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation,
            title: this.title,
            description: this.description,
            // properties: this.properties,
            elements: this.elements?.map(x => x.toSnapshot()) ?? [],
            relationships: this.relationships?.map(x => x.toSnapshot()) ?? [],
        }
    }

    public applyMetadata(metadata: IViewDefinitionMetadata) {
        metadata.elements?.forEach(element => this.elements.push(new ElementMetadata(element)));
        metadata.relationships?.forEach(relationship => this.relationships.push(new RelationshipMetadata(relationship)));
    }

    public setElementPosition(elementId: string, position: Position) {
        let element = this.elements.find(element => element.id === elementId);
        element.x = position.x;
        element.y = position.y;
    }

    public setRelationshipPosition(relationshipId: string) {
        this.relationships.push(new RelationshipMetadata({ id: relationshipId, x: 0, y: 0 }));
    }

    public addGroup(group: Group, position: Position) {
        this.include.push(group.identifier);
        this.elements.push(new ElementMetadata({ id: group.identifier, x: position.x, y: position.y }));
    }

    public addSoftwareSystem(softwareSystem: SoftwareSystem, position: Position) {
        this.include.push(softwareSystem.identifier);
        this.elements.push(new ElementMetadata({ id: softwareSystem.identifier, x: position.x, y: position.y }));
    }

    public addPerson(person: Person, position: Position) {
        this.include.push(person.identifier);
        this.elements.push(new ElementMetadata({ id: person.identifier, x: position.x, y: position.y }));
    }

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}