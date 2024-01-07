import { ReactFlowProvider } from "@reactflow/core";
import {
    IViewDefinition,
    ViewType,
    Workspace
} from "@structurizr/dsl";
import {
    useWorkspaceNavigation,
    Viewport,
    WorkspaceNavigationContext,
    WorkspaceNavigationProvider
} from "@workspace/core";
import { FC, PropsWithChildren, useContext } from "react";
import {
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "../components";

export const WorkspaceViewSelector: FC<PropsWithChildren<{
    workspace: Workspace;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onWorkspaceViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceChange,
    onWorkspaceViewClick
}) => {
    const { currentView } = useWorkspaceNavigation();

    switch (currentView?.type) {
        case ViewType.SystemLandscape:
            return (
                <SystemLandscapeView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onWorkspaceChange}
                    onWorkspaceViewClick={onWorkspaceViewClick}
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

export const WorkspaceNavigationWrapper: FC<PropsWithChildren<{
    initialView: IViewDefinition;
    viewport?: Viewport;
    onViewChange?: (view: IViewDefinition) => void;
    onViewportChange?: (viewport: Viewport) => void;
}>> = ({
    children,
    initialView,
    viewport,
    onViewChange,
    onViewportChange,
}) => {
    const provider = useContext(WorkspaceNavigationContext);

    return provider === null || provider === undefined ? (
        <WorkspaceNavigationProvider
            initialView={initialView}
            viewport={viewport}
            onViewChange={onViewChange}
            onViewportChange={onViewportChange}
        >
            {children}
        </WorkspaceNavigationProvider>
    ) : (
        <>
            {children}
        </>
    )
}

export const WorkspaceDiagramming: FC<PropsWithChildren<{
    workspace: Workspace;
    initialView: IViewDefinition;
    viewport?: Viewport;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onWorkspaceViewChange?: (view: IViewDefinition) => void;
    onWorkspaceViewportChange?: (viewport: Viewport) => void;
    onWorkspaceViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    initialView,
    viewport,
    onWorkspaceChange,
    onWorkspaceViewChange,
    onWorkspaceViewportChange,
    onWorkspaceViewClick
}) => {
    return (
        <WorkspaceNavigationWrapper
            initialView={initialView}
            viewport={viewport}
            onViewChange={onWorkspaceViewChange}
            onViewportChange={onWorkspaceViewportChange}
        >
            <WorkspaceViewSelector
                workspace={workspace}
                onWorkspaceChange={onWorkspaceChange}
                onWorkspaceViewClick={onWorkspaceViewClick}
            >
                {children}
            </WorkspaceViewSelector>
        </WorkspaceNavigationWrapper>
    )
}