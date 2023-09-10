import {
    IViewDefinition,
    IWorkspace,
    IWorkspaceMetadata,
    ViewType,
} from "@structurizr/dsl";
import {
    NodeMouseHandler,
    OnInit,
    ReactFlowProvider,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
} from "react";
import {
    WorkspaceStoreUpdater,
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "../containers";
import { useWorkspaceStore } from "../hooks";

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace: IWorkspace;
    view: IViewDefinition;
    metadata: IWorkspaceMetadata;
}>> = ({
    children,
    workspace,
    view,
    metadata
}) => {
    const store = useWorkspaceStore();

    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
                view={view}
                metadata={metadata}
            />

            {store.selectedView?.type === ViewType.SystemLandscape && (
                <SystemLandscapeView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                />
            )}

            {store.selectedView?.type === ViewType.SystemContext && (
                <SystemContextView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                />
            )}

            {store.selectedView?.type === ViewType.Container && (
                <ContainerView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                />
            )}

            {store.selectedView?.type === ViewType.Component && (
                <ComponentView
                    model={store.workspace.model}
                    configuration={store.workspace.views.configuration}
                    view={store.selectedView}
                />
            )}

            {store.selectedView?.type === ViewType.Deployment && (
                <DeploymentView
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={store.selectedView as any}
                />
            )}

            {children}
        </ReactFlowProvider>
    )
}