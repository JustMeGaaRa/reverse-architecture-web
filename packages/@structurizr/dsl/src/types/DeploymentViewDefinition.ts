import { IDeploymentView, ISupportSnapshot, IViewDefinitionMetadata } from "../interfaces";
import { AutoLayout } from "./AutoLayout";
import { Container } from "./Container";
import { DeploymentNode } from "./DeploymentNode";
import { ElementMetadata } from "./ElementMetadata";
import { All, Identifier } from "./Identifier";
import { InfrastructureNode } from "./InfrastructureNode";
import { Position } from "./Position";
import { RelationshipMetadata } from "./RelationshipMetadata";
import { SoftwareSystem } from "./SoftwareSystem";
import { ViewType } from "./ViewType";

type DeploymentViewValues = 
    Required<Pick<IDeploymentView, "key" | "environment">>
    & Partial<Omit<IDeploymentView, "type" | "environment">>;

export class DeploymentViewDefinition implements ISupportSnapshot<IDeploymentView> {
    constructor(values: DeploymentViewValues) {
        this.type = ViewType.Deployment;
        this.softwareSystemIdentifier = values.softwareSystemIdentifier;
        this.environment = values.environment;
        this.key = values.key;
        this.description = values.description;
        this.include = values.include ?? [];
        this.exclude = values.exclude ?? [];
        this.autoLayout = values.autoLayout ? new AutoLayout(values.autoLayout) : undefined;
        this.animation = values.animation;
        this.title = values.title;
        // this.properties = values.properties;
        this.elements = values.elements ? values.elements.map(x => new ElementMetadata(x)) : [];
        this.relationships = values.relationships ? values.relationships.map(x => new RelationshipMetadata(x)) : [];
    }

    public type: ViewType.Deployment;
    public softwareSystemIdentifier: string;
    public environment: string;
    public key?: string;
    public description?: string;
    public include: Array<Identifier | All>;
    public exclude: Array<Identifier>;
    public autoLayout?: AutoLayout;
    public animation?: any;
    public title?: string;
    // public properties?: Properties;
    public elements: Array<ElementMetadata>;
    public relationships: Array<RelationshipMetadata>;

    public toSnapshot(): IDeploymentView {
        return {
            type: this.type,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
            environment: this.environment,
            key: this.key,
            description: this.description,
            include: this.include,
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation,
            title: this.title,
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

    public addSoftwareSystem(softwareSystem: SoftwareSystem, position: Position) {
        this.include.push(softwareSystem.identifier);
        this.elements.push(new ElementMetadata({ id: softwareSystem.identifier, x: position.x, y: position.y }));
    }

    public addContainer(container: Container, position: Position) {
        this.include.push(container.identifier);
        this.elements.push(new ElementMetadata({ id: container.identifier, x: position.x, y: position.y }));
    }

    public addDeploymentNode(deploymentNode: DeploymentNode, position: Position) {
        this.include.push(deploymentNode.identifier);
        this.elements.push(new ElementMetadata({ id: deploymentNode.identifier, x: position.x, y: position.y }));
    }

    public addInfrastructureNode(infrastructureNode: InfrastructureNode, position: Position) {
        this.include.push(infrastructureNode.identifier);
        this.elements.push(new ElementMetadata({ id: infrastructureNode.identifier, x: position.x, y: position.y }));
    }

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}