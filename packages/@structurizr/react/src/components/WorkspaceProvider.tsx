import * as Types from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useState } from "react";
import {
    ComponentContext,
    ComponentViewContext,
    ContainerContext,
    ContainerViewContext,
    DeploymentEnvironmentContext,
    DeploymentViewContext,
    GroupContext,
    ModelContext,
    PersonContext,
    RelationshipContext,
    SoftwareSystemContext,
    StylesContext,
    SystemContextViewContext,
    SystemLandscapeViewContext,
    ThemeContext,
    ViewsContext,
    WorkspaceContext
} from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<Types.Workspace>();

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const Workspace: FC<PropsWithChildren<{ workspace: Types.Workspace }>> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<Types.Workspace>();
    
    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            <div>
                {children}
            </div>
        </WorkspaceContext.Provider>
    )
}

export const Model: FC<PropsWithChildren<{ model: Types.Model }>> = ({ children }) => {
    const [ model, setModel ] = useState<Types.Model>();

    return (
        <ModelContext.Provider value={{ model, setModel }}>
            <div>
                {children}
            </div>
        </ModelContext.Provider>
    )
}

export const Person: FC<PropsWithChildren<{ person: Types.Person }>> = ({ children }) => {
    const [ person, setPerson ] = useState<Types.Person>();
    
    return (
        <PersonContext.Provider value={{ person, setPerson }}>
            <div>
                {children}
            </div>
        </PersonContext.Provider>
    )
}

export const Group: FC<PropsWithChildren<{ group: Types.Group }>> = ({ children }) => {
    const [ group, setGroup ] = useState<Types.Group>();

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            <div>
                {children}
            </div>
        </GroupContext.Provider>
    )
}

export const SoftwareSystem: FC<PropsWithChildren<{ softwareSystem: Types.SoftwareSystem }>> = ({ children }) => {
    const [ softwareSystem, setSoftwareSystem ] = useState<Types.SoftwareSystem>();

    return (
        <SoftwareSystemContext.Provider value={{ softwareSystem, setSoftwareSystem }}>
            <div>
                {children}
            </div>
        </SoftwareSystemContext.Provider>
    )
}

export const Container: FC<PropsWithChildren<{ container: Types.Container }>> = ({ children }) => {
    const [ container, setContainer ] = useState<Types.Container>();
    
    return (
        <ContainerContext.Provider value={{ container, setContainer }}>
            <div>
                {children}
            </div>
        </ContainerContext.Provider>
    )
}

export const Component: FC<PropsWithChildren<{ component: Types.Component }>> = ({ children }) => {
    const [ component, setComponent ] = useState<Types.Component>();

    return (
        <ComponentContext.Provider value={{ component, setComponent }}>
            <div>
                {children}
            </div>
        </ComponentContext.Provider>
    )
}

export const DeploymentEnvironment: FC<PropsWithChildren<{ deploymentEnvironment: Types.DeploymentEnvironment }>> = ({ children }) => {
    const [ deploymentEnvironment, setDeploymentEnvironment ] = useState<Types.DeploymentEnvironment>();

    return (
        <DeploymentEnvironmentContext.Provider value={{ deploymentEnvironment, setDeploymentEnvironment }}>
            <div>
                {children}
            </div>
        </DeploymentEnvironmentContext.Provider>
    )
}

export const Relationship: FC<PropsWithChildren<{ relationship: Types.Relationship }>> = ({ children }) => {
    const [ relationship, setRelationship ] = useState<Types.Relationship>();

    return (
        <RelationshipContext.Provider value={{ relationship, setRelationship }}>
            <div>
                {children}
            </div>
        </RelationshipContext.Provider>
    )
}

export const Views: FC<PropsWithChildren<{ views: Types.Views }>> = ({ children }) => {
    const [ views, setViews ] = useState<Types.Views>();
    
    return (
        <ViewsContext.Provider value={{ views, setViews }}>
            <div>
                {children}
            </div>
        </ViewsContext.Provider>
    )
}

export const SystemLandscapeView: FC<PropsWithChildren<{ view: Types.SystemLandscapeView }>> = ({ children }) => {
    const [ systemLandscapeView, setSystemLandscapeView ] = useState<Types.SystemLandscapeView>();

    return (
        <SystemLandscapeViewContext.Provider value={{ systemLandscapeView, setSystemLandscapeView }}>
            <div>
                {children}
            </div>
        </SystemLandscapeViewContext.Provider>
    )
}

export const SystemContextView: FC<PropsWithChildren<{ view: Types.SystemContextView }>> = ({ children }) => {
    const [ systemContextView, setSystemContextView ] = useState<Types.SystemContextView>();

    return (
        <SystemContextViewContext.Provider value={{ systemContextView, setSystemContextView }}>
            <div>
                {children}
            </div>
        </SystemContextViewContext.Provider>
    )
}

export const ContainerView: FC<PropsWithChildren<{ view: Types.ComponentView }>> = ({ children }) => {
    const [ containerView, setContainerView ] = useState<Types.ContainerView>();

    return (
        <ContainerViewContext.Provider value={{ containerView, setContainerView }}>
            <div>
                {children}
            </div>
        </ContainerViewContext.Provider>
    )
}

export const ComponentView: FC<PropsWithChildren<{ view: Types.ComponentView }>> = ({ children }) => {
    const [ componentView, setComponentView ] = useState<Types.ComponentView>();

    return (
        <ComponentViewContext.Provider value={{ componentView, setComponentView }}>
            <div>
                {children}
            </div>
        </ComponentViewContext.Provider>
    )
}

export const DeploymentView: FC<PropsWithChildren<{ view: Types.DeploymentView }>> = ({ children }) => {
    const [ deploymentView, setDeploymentView ] = useState<Types.DeploymentView>();

    return (
        <DeploymentViewContext.Provider value={{ deploymentView, setDeploymentView }}>
            <div>
                {children}
            </div>
        </DeploymentViewContext.Provider>
    )
}

export const Styles: FC<PropsWithChildren<{ styles: any }>> = ({ children }) => {
    const [ styles, setStyles ] = useState<Types.Styles>();
    
    return (
        <StylesContext.Provider value={{ styles, setStyles }}>
            <div>
                {children}
            </div>
        </StylesContext.Provider>
    )
}

export const ElementStyle: FC<PropsWithChildren<{ style: any }>> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const RelationshipStyle: FC<PropsWithChildren<{ style: any }>> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const Theme: FC<{ url: string }> = ({ url }) => {
    const [ theme, setTheme ] = useState<Types.Theme>();

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div>
            </div>
        </ThemeContext.Provider>
    )
}