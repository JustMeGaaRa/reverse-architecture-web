import {
    AutoLayout,
    Container,
    DeploymentNode,
    IElementPosition,
    InfrastructureNode,
    IRelationshipPosition,
    ISupportImmutable,
    IViewDefinition,
    Position,
    Properties,
    SoftwareSystem,
    ViewType
} from "../..";

export interface IDeploymentView extends IViewDefinition {
    type: ViewType;
    identifier: string;
    environment: string;
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
        this.autoLayout = values.autoLayout;
        this.animation = values.animation;
        this.title = values.title;
        this.properties = values.properties;
        this.elements = values.elements ?? [];
        this.relationships = values.relationships ?? [];
    }

    public readonly type: ViewType;
    public readonly identifier: string;
    public readonly environment: string;
    public readonly key?: string;
    public readonly description?: string;
    public readonly include: string[];
    public readonly autoLayout?: AutoLayout;
    public readonly animation?: any;
    public readonly title?: string;
    public readonly properties?: Properties;
    public readonly elements: Array<IElementPosition>;
    public readonly relationships: Array<IRelationshipPosition>;

    public toObject(): IDeploymentView {
        return {
            type: this.type,
            identifier: this.identifier,
            environment: this.environment,
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
}