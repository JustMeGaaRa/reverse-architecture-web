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
import {
    useViewportUtils,
    useWorkspaceStore,
    WorkspaceViewsSelector
} from "../hooks";

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace: IWorkspace;
    view: IViewDefinition;
    metadata: IWorkspaceMetadata;
    onInitialize?: OnInit;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    view,
    metadata
}) => {
    // NOTE: used to track the user cursor position
    // const { getViewportPoint } = useViewportUtils();
    const handleOnMouseMove = useCallback((event: any) => {
        // const boxOffset = event.currentTarget.getBoundingClientRect();
        // const targetPoint = { x: event.clientX - boxOffset.left, y: event.clientY - boxOffset.top };
        // const viewportPoint = getViewportPoint(targetPoint);
        // onMouseMove?.({ relativePoint: targetPoint, viewportPoint: viewportPoint });
    }, []);

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

            {/* {selectedView?.type === ViewType.Deployment && (
                <DeploymentView
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={selectedView}
                />
            )} */}

            {children}
        </ReactFlowProvider>
    )
}