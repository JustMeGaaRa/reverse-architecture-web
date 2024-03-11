import {
    All,
    AutoLayoutDirection,
    ElementStyleCollection,
    ElementType,
    Identifier,
    RelationshipStyleCollection,
    RelationshipType,
    Tag,
    Technology,
    Url,
    ViewType
} from "../types";

export interface IBuilder<T> {
    build(): T;
}

export interface IElementVisitor {
    visitGroup(
        group: IGroup,
        params?: { parentId?: string }): void;
    visitPerson(
        person: IPerson,
        params?: { parentId?: string }): void;
    visitSoftwareSystem(
        softwareSystem: ISoftwareSystem,
        params?: { parentId?: string }): void;
    visitContainer(
        container: IContainer,
        params?: { parentId?: string }): void;
    visitComponent(
        component: IComponent,
        params?: { parentId?: string }): void;
    visitDeploymentNode(
        deploymentNode: IDeploymentNode,
        params?: { parentId?: string }): void;
    visitInfrastructureNode(
        infrastructureNode: IInfrastructureNode,
        params?: { parentId?: string }): void;
    visitSoftwareSystemInstance(
        softwareSystemInstance: ISoftwareSystemInstance,
        params?: { parentId?: string }): void;
    visitContainerInstance(
        containerInstance: IContainerInstance,
        params?: { parentId?: string }): void;
    visitRelationship(relationship: IRelationship): void;
}

export interface ISupportVisitor {
    accept(visitor: IElementVisitor): void;
}

export interface ISupportSnapshot<T> {
    toSnapshot(): T;
}

export interface IWorkspaceSnapshot {
    version: number;
    name?: string;
    description?: string;
    lastModifiedDate?: Date;
    properties?: IProperties;
    model: IModel;
    views: IViews;
}

export interface IModel {
    people: IPerson[];
    softwareSystems: ISoftwareSystem[];
    deploymentEnvironments: IDeploymentEnvironment[];
    relationships: IRelationship[];
    groups: IGroup[];
}

export interface IElement {
    identifier: Identifier;
    type: ElementType;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}

export interface IPerson extends IElement {
    type: ElementType.Person;
    identifier: Identifier;
    name: string;
    tags: Tag[];
    description?: string;
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface ISoftwareSystem extends IElement {
    type: ElementType.SoftwareSystem;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    containers: IContainer[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface IContainer extends IElement {
    type: ElementType.Container;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    components: IComponent[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface IComponent extends IElement {
    type: ElementType.Component;
    identifier: Identifier;
    name: string;
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface ISoftwareSystemInstance {
    type: ElementType.SoftwareSystemInstance;
    identifier?: Identifier;
    softwareSystemIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    healthCheck?: IHealthCheck;
}

export interface IContainerInstance {
    type: ElementType.ContainerInstance;
    identifier?: Identifier;
    containerIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    healthCheck?: IHealthCheck;
}

export interface IDeploymentEnvironment {
    identifier: Identifier;
    name: string;
    deploymentGroups: IDeploymentGroup[];
    deploymentNodes: IDeploymentNode[];
    relationships: IRelationship[];
}

export interface IDeploymentNode extends IElement {
    type: ElementType.DeploymentNode;
    identifier: Identifier;
    name: string;
    deploymentNodes: IDeploymentNode[];
    infrastructureNodes: IInfrastructureNode[];
    softwareSystemInstances: ISoftwareSystemInstance[];
    containerInstances: IContainerInstance[];
    technology: Technology[];
    description?: string;
    instances?: number;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface IInfrastructureNode {
    type: ElementType.InfrastructureNode;
    identifier: Identifier;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}

export interface IDeploymentGroup {
    name: string;
}

export interface IRelationship {
    type: RelationshipType.Relationship;
    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    // properties?: IProperties;
    // perspectives?: IPerspectives;
}

export interface IGroup extends IElement {
    type: ElementType.Group;
    identifier: Identifier;
    name: string;
    tags: Tag[];
    people: IPerson[];
    softwareSystems: ISoftwareSystem[];
    containers: IContainer[];
    components: IComponent[];
}

export interface IViewDefinition extends IViewDefinitionMetadata {
    type: ViewType;
    identifier: Identifier;
    key?: string;
    title?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    description?: string;
    properties?: IProperties;
}

export type ViewKeys = Pick<IViewDefinition, "type" | "identifier" | "title">;

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
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

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
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

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
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

export interface IComponentView extends IViewDefinition {
    type: ViewType;
    identifier: string;
    key?: string;
    include?: Array<Identifier | All>;
    exclude?: Array<Identifier>;
    autoLayout?: IAutoLayout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

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
    properties?: IProperties;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

export interface IAutoLayout {
    direction: AutoLayoutDirection;
    rankSeparation: number;
    nodeSeparation: number;
}

export interface IConfiguration {
    styles: IStyles;
    theme?: string;
    themes: string[];
    // branding?: Branding;
    // terminology?: Terminology;
}

export interface IStyles {
    elements: ElementStyleCollection;
    relationships: RelationshipStyleCollection;
}

export interface IViews {
    systemLandscape?: ISystemLandscapeView[];
    systemContexts: ISystemContextView[];
    containers: IContainerView[];
    components: IComponentView[];
    deployments: IDeploymentView[];
    configuration: IConfiguration;
    // properties?: Properties;
}

export interface IWorkspaceMetadata {

}

export interface IProperties {

}

export interface IPerspectives {

}

export interface IHealthCheck {

}

export interface IElementPosition {
    id: string;
    x: number;
    y: number;
    height?: number;
    width?: number;
}

export interface IRelationshipPosition {
    id: string;
}

export interface IViewDefinitionMetadata {
    identifier: Identifier;
    key?: string;
    elements?: Array<IElementPosition>;
    relationships?: Array<IRelationshipPosition>;
}

export interface IViewsMetadata {
    systemLandscape: Array<IViewDefinitionMetadata>;
    systemContexts: Array<IViewDefinitionMetadata>;
    containers: Array<IViewDefinitionMetadata>;
    components: Array<IViewDefinitionMetadata>;
    deployments: Array<IViewDefinitionMetadata>;
}

export interface IWorkspaceMetadata {
    name: string;
    lastModifiedDate: Date;
    views: IViewsMetadata;
}

export interface IWorkspaceTheme {
    name: string;
    description: string;
    lastModifiedDate: Date;
    elements: ElementStyleCollection,
    relationships: RelationshipStyleCollection;
}