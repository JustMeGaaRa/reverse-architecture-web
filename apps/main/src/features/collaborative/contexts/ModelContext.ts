import { createContext, Dispatch, SetStateAction } from "react";
import * as Types from "../types";

export const ModelContext = createContext<{
    model: Types.Model;
    setModel: Dispatch<SetStateAction<Types.Model>>;
}>({
    model: null,
    setModel: () => { console.log("Model Context: dummy setModel") },
});

export const ViewsContext = createContext<{
    views: Types.Views;
    setViews: Dispatch<SetStateAction<Types.Views>>;
}>({
    views: null,
    setViews: () => { console.log("Views Context: dummy setViews") },
});

export const PersonContext = createContext<{
    person: Types.Person;
    setPerson: Dispatch<SetStateAction<Types.Person>>;
}>({
    person: null,
    setPerson: () => { console.log("Person Context: dummy setPerson") },
});

export const GroupContext = createContext<{
    group: Types.Group;
    setGroup: Dispatch<SetStateAction<Types.Group>>;
}>({
    group: null,
    setGroup: () => { console.log("Group Context: dummy setGroup") },
});

export const SoftwareSystemContext = createContext<{
    softwareSystem: Types.SoftwareSystem;
    setSoftwareSystem: Dispatch<SetStateAction<Types.SoftwareSystem>>;
}>({
    softwareSystem: null,
    setSoftwareSystem: () => { console.log("SoftwareSystem Context: dummy setSoftwareSystem") },
});

export const ContainerContext = createContext<{
    container: Types.Container;
    setContainer: Dispatch<SetStateAction<Types.Container>>;
}>({
    container: null,
    setContainer: () => { console.log("Container Context: dummy setContainer") },
});

export const ComponentContext = createContext<{
    component: Types.Component;
    setComponent: Dispatch<SetStateAction<Types.Component>>;
}>({
    component: null,
    setComponent: () => { console.log("Component Context: dummy setComponent") },
});

export const DeploymentEnvironmentContext = createContext<{
    deploymentEnvironment: Types.DeploymentEnvironment;
    setDeploymentEnvironment: Dispatch<SetStateAction<Types.DeploymentEnvironment>>;
}>({
    deploymentEnvironment: null,
    setDeploymentEnvironment: () => { console.log("DeploymentEnvironment Context: dummy setDeploymentEnvironment") },
});

export const RelationshipContext = createContext<{
    relationship: Types.Relationship;
    setRelationship: Dispatch<SetStateAction<Types.Relationship>>;
}>({
    relationship: null,
    setRelationship: () => { console.log("Relationship Context: dummy setRelationship") },
});

export const SystemLandscapeViewContext = createContext<{
    systemLandscapeView: Types.SystemLandscapeView;
    setSystemLandscapeView: Dispatch<SetStateAction<Types.SystemLandscapeView>>;
}>({
    systemLandscapeView: null,
    setSystemLandscapeView: () => { console.log("SystemLandscapeView Context: dummy setSystemLandscapeView") },
});

export const SystemContextViewContext = createContext<{
    systemContextView: Types.SystemContextView;
    setSystemContextView: Dispatch<SetStateAction<Types.SystemContextView>>;
}>({
    systemContextView: null,
    setSystemContextView: () => { console.log("SystemContextView Context: dummy setSystemContextView") },
});

export const ContainerViewContext = createContext<{
    containerView: Types.ContainerView;
    setContainerView: Dispatch<SetStateAction<Types.ContainerView>>;
}>({
    containerView: null,
    setContainerView: () => { console.log("ContainerView Context: dummy setContainerView") },
});

export const ComponentViewContext = createContext<{
    componentView: Types.ComponentView;
    setComponentView: Dispatch<SetStateAction<Types.ComponentView>>;
}>({
    componentView: null,
    setComponentView: () => { console.log("ComponentView Context: dummy setComponentView") },
});

export const DeploymentViewContext = createContext<{
    deploymentView: Types.DeploymentView;
    setDeploymentView: Dispatch<SetStateAction<Types.DeploymentView>>;
}>({
    deploymentView: null,
    setDeploymentView: () => { console.log("DeploymentView Context: dummy setDeploymentView") },
});

export const StylesContext = createContext<{
    styles: Types.Styles;
    setStyles: Dispatch<SetStateAction<Types.Styles>>;
}>({
    styles: null,
    setStyles: () => { console.log("Styles Context: dummy setStyles") },
});

export const ThemeContext = createContext<{
    theme: Types.Theme;
    setTheme: Dispatch<SetStateAction<Types.Theme>>;
}>({
    theme: null,
    setTheme: () => { console.log("Theme Context: dummy setTheme") },
});

