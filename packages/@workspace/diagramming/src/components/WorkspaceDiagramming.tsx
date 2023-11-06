import { ReactFlowProvider } from "@reactflow/core";
import {
    IViewDefinition,
    IWorkspace,
    IWorkspaceMetadata,
    ViewType,
} from "@structurizr/dsl";
import {
    WorkspaceStoreUpdater,
    useWorkspaceStore
} from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import {
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView,
    WorkspaceViewStoreUpdater
} from "../components";

export const WorkspaceDiagramming: FC<PropsWithChildren<{
    workspace: IWorkspace;
    view: IViewDefinition;
    metadata: IWorkspaceMetadata;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
    onWorkspaceViewChange?: (view: IViewDefinition) => void;
}>> = ({
    children,
    workspace,
    view,
    metadata,
    onWorkspaceChange,
    onWorkspaceViewChange
}) => {
    const store = useWorkspaceStore();

    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
                metadata={metadata}
            />

            <WorkspaceViewStoreUpdater
                workspace={workspace}
                view={view}
            />

            {store.selectedView?.type === ViewType.SystemLandscape && (
                <SystemLandscapeView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                    onWorkspaceChange={onWorkspaceChange}
                />
            )}

            {store.selectedView?.type === ViewType.SystemContext && (
                <SystemContextView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                    onWorkspaceChange={onWorkspaceChange}
                />
            )}

            {store.selectedView?.type === ViewType.Container && (
                <ContainerView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                    onWorkspaceChange={onWorkspaceChange}
                />
            )}

            {store.selectedView?.type === ViewType.Component && (
                <ComponentView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                    onWorkspaceChange={onWorkspaceChange}
                />
            )}

            {store.selectedView?.type === ViewType.Deployment && (
                <DeploymentView
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={store.selectedView as any}
                    onWorkspaceChange={onWorkspaceChange}
                />
            )}

            {children}
        </ReactFlowProvider>
    )
}