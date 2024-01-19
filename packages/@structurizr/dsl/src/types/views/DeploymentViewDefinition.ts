import {
    All,
    AutoLayout,
    AutoLayoutDirection,
    Container,
    DeploymentNode,
    IAutoLayout,
    Identifier,
    IElementPosition,
    InfrastructureNode,
    IRelationshipPosition,
    ISupportImmutable,
    IViewDefinition,
    IViewDefinitionMetadata,
    Position,
    Properties,
    SoftwareSystem
} from "../..";
import { ViewType } from "./ViewType";

export interface IDeploymentView extends IViewDefinition {
    type: ViewType;
    identifier: string;
    environment: string;
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

type DeploymentViewValues = 
    Required<Pick<IDeploymentView, "identifier" | "environment">>
    & Partial<Omit<IDeploymentView, "type" | "identifier" | "environment">>;

export class DeploymentViewDefinition implements IViewDefinition, ISupportImmutable<IDeploymentView> {
    constructor(values: DeploymentViewValues) {
        this.type = ViewType.Deployment;
        this.identifier = values.identifier;
        this.environment = values.environment;
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
    public environment: string;
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
        return new DeploymentViewDefinition({
            identifier: "default_deployment",
            title: "Deployment for New Environment",
            environment: "New Environment",
            autoLayout: { direction: AutoLayoutDirection.TopBotom, rankSeparation: 300, nodeSeparation: 300 },
        });
    }

    public toObject(): IDeploymentView {
        return {
            type: this.type,
            identifier: this.identifier,
            environment: this.environment,
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
        this.elements = [
            ...this.elements.filter(x => x.id !== elementId),
            { id: elementId, x: position.x, y: position.y }
        ]
    }

    public setRelationshipPosition(relationshipId: string) {
        this.relationships = [
            ...this.relationships.filter(x => x.id !== relationshipId),
            { id: relationshipId }
        ]
    }

    public addSoftwareSystem(softwareSystem: SoftwareSystem, position: Position) {
        this.include.push(softwareSystem.identifier);
        this.elements.push({ id: softwareSystem.identifier, x: position.x, y: position.y });
    }

    public addContainer(container: Container, position: Position) {
        this.include.push(container.identifier);
        this.elements.push({ id: container.identifier, x: position.x, y: position.y });
    }

    public addDeploymentNode(deploymentNode: DeploymentNode, position: Position) {
        this.include.push(deploymentNode.identifier);
        this.elements.push({ id: deploymentNode.identifier, x: position.x, y: position.y });
    }

    public addInfrastructureNode(infrastructureNode: InfrastructureNode, position: Position) {
        this.include.push(infrastructureNode.identifier);
        this.elements.push({ id: infrastructureNode.identifier, x: position.x, y: position.y });
    }

    public setAutoLayout(enabled: boolean) {
        this.autoLayout = enabled ? new AutoLayout() : undefined;
    }
}