import { ReactFlowProvider } from "@reactflow/core";
import { IViewDefinition, ViewType, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import {
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView,
    WorkspaceNavigationProvider
} from "../components";
import { useWorkspaceNavigation } from "../hooks";

export const WorkspaceViewSelector: FC<PropsWithChildren<{
    workspace: Workspace;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onWorkspaceViewChange?: (view: IViewDefinition) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceChange,
    onWorkspaceViewChange
}) => {
    const { currentView } = useWorkspaceNavigation();
    
    switch (currentView?.type) {
        case ViewType.SystemLandscape:
            return (
                <SystemLandscapeView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                >
                    {children}
                </SystemLandscapeView>
            );
        case ViewType.SystemContext:
            return (
                <SystemContextView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                >
                    {children}
                </SystemContextView>
            );
        case ViewType.Container:
            return (
                <ContainerView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                >
                    {children}
                </ContainerView>
            );
        case ViewType.Component:
            return (
                <ComponentView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                >
                    {children}
                </ComponentView>
            );
        case ViewType.Deployment:
            return (
                <DeploymentView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                >
                    {children}
                </DeploymentView>
            );
        default:
            return null;
    }
}

export const WorkspaceDiagramming: FC<PropsWithChildren<{
    workspace: Workspace;
    initialView: IViewDefinition;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onWorkspaceViewChange?: (view: IViewDefinition) => void;
}>> = ({
    children,
    workspace,
    initialView,
    onWorkspaceChange,
    onWorkspaceViewChange
}) => {
    return (
        <WorkspaceNavigationProvider initialView={initialView}>
            <ReactFlowProvider>
                <WorkspaceViewSelector
                    workspace={workspace}
                    onWorkspaceChange={onWorkspaceChange}
                    onWorkspaceViewChange={onWorkspaceViewChange}
                >
                    {children}
                </WorkspaceViewSelector>
            </ReactFlowProvider>
        </WorkspaceNavigationProvider>
    )
}