import { ViewType, Workspace } from "@structurizr/dsl";
import { useWorkspaceNavigation } from "@workspace/core";
import {
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "@workspace/diagramming";
import { ModelView } from "@workspace/modeling";
import { FC, PropsWithChildren } from "react";

export const WorkspaceViewSelector: FC<PropsWithChildren<{
    workspace: Workspace;
    onChange?: (workspace: Workspace) => void;
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    onChange,
    onViewClick
}) => {
    const { currentView } = useWorkspaceNavigation();

    switch (currentView?.type) {
        case ViewType.Model:
            return (
                <ModelView
                    workspace={workspace}
                    onWorkspaceChange={onChange}
                    onWorkspaceViewClick={onViewClick}
                >
                    {children}
                </ModelView>
            )
        case ViewType.SystemLandscape:
            return (
                <SystemLandscapeView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onChange}
                    onWorkspaceViewClick={onViewClick}
                >
                    {children}
                </SystemLandscapeView>
            );
        case ViewType.SystemContext:
            return (
                <SystemContextView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onChange}
                >
                    {children}
                </SystemContextView>
            );
        case ViewType.Container:
            return (
                <ContainerView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onChange}
                >
                    {children}
                </ContainerView>
            );
        case ViewType.Component:
            return (
                <ComponentView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onChange}
                >
                    {children}
                </ComponentView>
            );
        case ViewType.Deployment:
            return (
                <DeploymentView
                    workspace={workspace}
                    view={currentView as any}
                    onWorkspaceChange={onChange}
                >
                    {children}
                </DeploymentView>
            );
        default:
            return null;
    }
}