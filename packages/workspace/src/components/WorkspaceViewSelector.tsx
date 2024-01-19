import { ViewType } from "@structurizr/dsl";
import { useWorkspace, useWorkspaceNavigation } from "@workspace/core";
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
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    onViewClick
}) => {
    const { workspace } = useWorkspace();
    const { currentView } = useWorkspaceNavigation();

    switch (currentView?.type) {
        case ViewType.Model:
            return (
                <ModelView
                    workspace={workspace}
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
                >
                    {children}
                </SystemContextView>
            );
        case ViewType.Container:
            return (
                <ContainerView
                    workspace={workspace}
                    view={currentView as any}
                >
                    {children}
                </ContainerView>
            );
        case ViewType.Component:
            return (
                <ComponentView
                    workspace={workspace}
                    view={currentView as any}
                >
                    {children}
                </ComponentView>
            );
        case ViewType.Deployment:
            return (
                <DeploymentView
                    workspace={workspace}
                    view={currentView as any}
                >
                    {children}
                </DeploymentView>
            );
        default:
            return null;
    }
}