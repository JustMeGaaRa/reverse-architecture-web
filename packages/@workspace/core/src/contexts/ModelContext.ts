import {
    IComponent,
    IComponentView,
    IContainer,
    IContainerView,
    IDeploymentEnvironment,
    IDeploymentNode,
    IDeploymentView,
    IGroup,
    IInfrastructureNode,
    ISoftwareSystemInstance,
    IContainerInstance,
    IModel,
    IModelMetadata,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    IStyles,
    ISystemContextView,
    ISystemLandscapeView,
    IViewDefinitionMetadata,
    IViews,
    Theme
} from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";

export const ModelContext = createContext<{
    model: IModel;
    metadata: IModelMetadata;
    setModel?: Dispatch<SetStateAction<IModel>>;
    setMetadata?: Dispatch<SetStateAction<IModelMetadata>>;
}>({
    model: null,
    metadata: null,
    setModel: () => { console.debug("Model Context: dummy setModel") },
    setMetadata: () => { console.debug("Model Context: dummy setMetadata") },
});

export const ViewsContext = createContext<{
    views: IViews;
    setViews?: Dispatch<SetStateAction<IViews>>;
}>({
    views: null,
    setViews: () => { console.debug("Views Context: dummy setViews") },
});

export const PersonContext = createContext<{
    person: IPerson;
    setPerson?: Dispatch<SetStateAction<IPerson>>;
}>({
    person: null,
    setPerson: () => { console.debug("Person Context: dummy setPerson") },
});

export const GroupContext = createContext<{
    group: IGroup;
    setGroup?: Dispatch<SetStateAction<IGroup>>;
}>({
    group: null,
    setGroup: () => { console.debug("Group Context: dummy setGroup") },
});

export const SoftwareSystemContext = createContext<{
    softwareSystem: ISoftwareSystem;
    setSoftwareSystem?: Dispatch<SetStateAction<ISoftwareSystem>>;
}>({
    softwareSystem: null,
    setSoftwareSystem: () => { console.debug("SoftwareSystem Context: dummy setSoftwareSystem") },
});

export const ContainerContext = createContext<{
    container: IContainer;
    setContainer?: Dispatch<SetStateAction<IContainer>>;
}>({
    container: null,
    setContainer: () => { console.debug("Container Context: dummy setContainer") },
});

export const ComponentContext = createContext<{
    component: IComponent;
    setComponent?: Dispatch<SetStateAction<IComponent>>;
}>({
    component: null,
    setComponent: () => { console.debug("Component Context: dummy setComponent") },
});

export const DeploymentEnvironmentContext = createContext<{
    deploymentEnvironment: IDeploymentEnvironment;
    setDeploymentEnvironment?: Dispatch<SetStateAction<IDeploymentEnvironment>>;
}>({
    deploymentEnvironment: null,
    setDeploymentEnvironment: () => { console.debug("DeploymentEnvironment Context: dummy setDeploymentEnvironment") },
});

export const DeploymentNodeContext = createContext<{
    deploymentNode: IDeploymentNode;
    setDeploymentNode?: Dispatch<SetStateAction<IDeploymentNode>>;
}>({
    deploymentNode: null,
    setDeploymentNode: () => { console.debug("DeploymentNode Context: dummy setDeploymentNode") },
});

export const InfrastructureNodeContext = createContext<{
    infrastructureNode: IInfrastructureNode;
    setInfrastructureNode?: Dispatch<SetStateAction<IInfrastructureNode>>;
}>({
    infrastructureNode: null,
    setInfrastructureNode: () => { console.debug("InfrastructureNode Context: dummy setInfrastructureNode") },
});

export const SoftwareSystemInstanceContext = createContext<{
    softwareSystemInstance: ISoftwareSystemInstance;
    setSoftwareSystemInstance?: Dispatch<SetStateAction<ISoftwareSystemInstance>>;
}>({
    softwareSystemInstance: null,
    setSoftwareSystemInstance: () => { console.debug("SoftwareSystemInstance Context: dummy setSoftwareSystemInstance") },
});

export const ContainerInstanceContext = createContext<{
    containerInstance: IContainerInstance;
    setContainerInstance?: Dispatch<SetStateAction<IContainerInstance>>;
}>({
    containerInstance: null,
    setContainerInstance: () => { console.debug("ContainerInstance Context: dummy setContainerInstance") },
});

export const RelationshipContext = createContext<{
    relationship: IRelationship;
    setRelationship?: Dispatch<SetStateAction<IRelationship>>;
}>({
    relationship: null,
    setRelationship: () => { console.debug("Relationship Context: dummy setRelationship") },
});

export const ViewMetadataContext = createContext<{
    metadata: IViewDefinitionMetadata;
    setMetadata?: Dispatch<SetStateAction<IViewDefinitionMetadata>>;
}>({
    metadata: null,
    setMetadata: () => { console.debug("ViewMetadata Context: dummy setMetadata") },
});

export const SystemLandscapeViewContext = createContext<{
    systemLandscapeView: ISystemLandscapeView;
    setSystemLandscapeView?: Dispatch<SetStateAction<ISystemLandscapeView>>;
}>({
    systemLandscapeView: null,
    setSystemLandscapeView: () => { console.debug("SystemLandscapeView Context: dummy setSystemLandscapeView") },
});

export const SystemContextViewContext = createContext<{
    systemContextView: ISystemContextView;
    setSystemContextView?: Dispatch<SetStateAction<ISystemContextView>>;
}>({
    systemContextView: null,
    setSystemContextView: () => { console.debug("SystemContextView Context: dummy setSystemContextView") },
});

export const ContainerViewContext = createContext<{
    containerView: IContainerView;
    setContainerView?: Dispatch<SetStateAction<IContainerView>>;
}>({
    containerView: null,
    setContainerView: () => { console.debug("ContainerView Context: dummy setContainerView") },
});

export const ComponentViewContext = createContext<{
    componentView: IComponentView;
    setComponentView?: Dispatch<SetStateAction<IComponentView>>;
}>({
    componentView: null,
    setComponentView: () => { console.debug("ComponentView Context: dummy setComponentView") },
});

export const DeploymentViewContext = createContext<{
    deploymentView: IDeploymentView;
    setDeploymentView?: Dispatch<SetStateAction<IDeploymentView>>;
}>({
    deploymentView: null,
    setDeploymentView: () => { console.debug("DeploymentView Context: dummy setDeploymentView") },
});

export const StylesContext = createContext<{
    styles: IStyles;
    setStyles?: Dispatch<SetStateAction<IStyles>>;
}>({
    styles: null,
    setStyles: () => { console.debug("Styles Context: dummy setStyles") },
});

export const ThemesContext = createContext<{
    themes: Array<Theme>;
    setThemes?: Dispatch<SetStateAction<Array<Theme>>>;
}>({
    themes: null,
    setThemes: () => { console.debug("Themes Context: dummy setThemes") },
});

