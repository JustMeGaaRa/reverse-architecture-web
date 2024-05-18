import { CstChildrenDictionary, CstNode, CstNodeLocation, IToken } from "chevrotain";

export interface CstNodeTyped<T extends CstChildrenDictionary> extends CstNode {
    readonly name: string;
    readonly children: T;
    readonly recoveredNode?: boolean;
    readonly location?: CstNodeLocation;
}

export type WorkspaceContext = {
    workspaceLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    modelNode?: Array<CstNode>;
    viewsNode?: Array<CstNode>;
}

export type ModelContext = {
    modelLiteral?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    peopleNodes?: Array<CstNode>;
    softwareSystemNodes?: Array<CstNode>;
    deploymentEnvironmentNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
}

export interface PersonContext {
    elementIdentifier?: Array<IToken>;
    personLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    elementProperties?: Array<CstNode>;
}

export interface GroupContext {
    elementIdentifier?: Array<IToken>;
    groupLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    personNodes?: Array<CstNode>;
    softwareSystemNodes?: Array<CstNode>;
    containerNodes?: Array<CstNode>;
    componentNodes?: Array<CstNode>;
}

export interface SoftwareSystemContext {
    elementIdentifier?: Array<IToken>;
    softwareSystemLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    containerNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface ContainerContext {
    elementIdentifier?: Array<IToken>;
    containerLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    componentNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface ComponentContext {
    elementIdentifier?: Array<IToken>;
    componentLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface DeploymentEnvironmentContext {
    elementIdentifier?: Array<IToken>;
    deploymentEnvironmentLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    deploymentNodeNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
}

export interface DeploymentNodeContext {
    elementIdentifier?: Array<IToken>;
    deploymentNodeLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    instancesParameter?: Array<IToken>;
    deploymentNodeNodes?: Array<CstNode>;
    infrastructureNodeNodes?: Array<CstNode>;
    softwareSystemInstanceNodes?: Array<CstNode>;
    containerInstanceNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface InfrastructureNodeContext {
    elementIdentifier?: Array<IToken>;
    infrastructureNodeLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface SoftwareSystemInstanceContext {
    elementIdentifier?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    softwareSystemInstanceLiteral?: Array<IToken>;
    deploymentGroupsParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface ContainerInstanceContext {
    elementIdentifier?: Array<IToken>;
    containerIdentifier?: Array<IToken>;
    containerInstanceLiteral?: Array<IToken>;
    deploymentGroupsParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

export interface RelationshipContext {
    sourceIdentifier?: Array<IToken>;
    targetIdentifier?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
}

export type ViewsContext = {
    viewsLiteral?: Array<IToken>;
    systemLandscapeViewNodes?: Array<CstNode>;
    systemContextViewNodes?: Array<CstNode>;
    containerViewNodes?: Array<CstNode>;
    componentViewNodes?: Array<CstNode>;
    deploymentViewNodes?: Array<CstNode>;
    stylesNodes?: Array<CstNode>;
    themesNodes?: Array<CstNode>;
}

export interface SystemLandscapeViewContext {
    systemLandscapeLiteral?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

export interface SystemContextViewContext {
    systemContextLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

export interface ContainerViewContext {
    containerLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

export interface ComponentViewContext {
    componentLiteral?: Array<IToken>;
    containerIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

export interface DeploymentViewContext {
    deploymentLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    environmentParameter?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

export interface ViewPropertiesContext {
    includeProperty?: Array<CstNode>;
    excludeProperty?: Array<CstNode>;
    autoLayoutProperty?: Array<CstNode>;
}

export interface AutoLayoutPropertyContext {
    
}

export interface PropertyContext {
    Identifier?: Array<{ image?: string }>;
    StringLiteral?: Array<{ image?: string }>;
    NumericLiteral?: Array<{ image?: string }>;
    HexColorLiteral?: Array<{ image?: string }>;
    BooleanLiteral?: Array<{ image?: string }>;
    UrlLiteral?: Array<{ image?: string }>;
}