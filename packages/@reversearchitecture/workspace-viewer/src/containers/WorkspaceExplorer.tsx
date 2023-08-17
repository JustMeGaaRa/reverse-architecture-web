import {
    IConfiguration,
    IContainerView,
    IModel,
    IWorkspace,
    IWorkspaceMetadata,
    Tag,
    ViewType,
} from "@structurizr/dsl";
import {
    Node,
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
    WorkspaceBreadcrumbs,
    WorkspaceViewRenderer,
    WorkspaceStoreUpdater,
    WorkspaceToolbar,
    WorkspaceZoomControls,
    SystemLandscapeView,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "../containers";
import {
    useMetadata,
    useViewportUtils,
    useWorkspace,
    useWorkspaceStore,
    useWorkspaceToolbarStore
} from "../hooks";

type MousePosition = {
    relativePoint: { x: number, y: number },
    viewportPoint: { x: number, y: number },
}

type MouseMoveEventHandler = (event: MousePosition) => void;

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace: IWorkspace;
    metadata: IWorkspaceMetadata;
    onInitialize?: OnInit;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
    onMouseMove?: MouseMoveEventHandler;
}>> = ({
    children,
    workspace,
    metadata,
    onNodeDragStop,
    onNodesDoubleClick,
    onMouseMove
}) => {
    const { setSelectedView } = useWorkspace();
    const { setElementPosition } = useMetadata();
    
    // NOTE: used to zoom into the element of choice
    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (node.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            setSelectedView({
                identifier: node.data.element.identifier,
                type: ViewType.Container
            });
        }

        if (node.data.element.tags.some(tag => tag.name === Tag.Container.name)) {
            setSelectedView({
                identifier: node.data.element.identifier,
                type: ViewType.Component
            });
        }

        onNodesDoubleClick?.(event, node);
    }, [onNodesDoubleClick, setSelectedView]);

    // NOTE: used to update the element position in the metadata
    const { selectedView } = useWorkspaceStore();
    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        setElementPosition(selectedView, node.data.element.identifier, node.position);
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop, selectedView, setElementPosition]);

    // NOTE: used to track the user cursor position
    // const { getViewportPoint } = useViewportUtils();
    const handleOnMouseMove = useCallback((event: any) => {
        const boxOffset = event.currentTarget.getBoundingClientRect();
        const targetPoint = { x: event.clientX - boxOffset.left, y: event.clientY - boxOffset.top };
        // const viewportPoint = getViewportPoint(targetPoint);
        // onMouseMove?.({ relativePoint: targetPoint, viewportPoint: viewportPoint });
    }, []);

    // NOTE: the workspace object from props is used instead of one from the store,
    // because we don't wont to trigger a re-render when the workspace is updated,
    // as the hooks make changes to both the store and the workspace object
    const {
        systemLandscape,
        systemContexts,
        containers,
        components,
        deployments
    } = {
        systemLandscape: workspace.views.systemLandscape?.identifier === selectedView.identifier
            ? workspace.views.systemLandscape : undefined,
        systemContexts: workspace.views.systemContexts
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier),
        containers: workspace.views.containers
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier),
        components: workspace.views.components
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier),
        deployments: workspace.views.deployments
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier && view.environment === selectedView["environment"]),
    }

    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
                metadata={metadata}
            />

            {children}

            {systemLandscape && (
                <SystemLandscapeView
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={workspace.views.systemLandscape}
                    onNodesDoubleClick={handleOnDoubleClick}
                />
            )}

            {systemContexts.map(view => (
                <SystemContextView
                    key={view.identifier}
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={view}
                    onNodesDoubleClick={handleOnDoubleClick}
                />
            ))}

            {containers.map(view => (
                <ContainerView
                    key={view.identifier}
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={view}
                    onNodesDoubleClick={handleOnDoubleClick}
                />
            ))}

            {components.map(view => (
                <ComponentView
                    key={view.identifier}
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={view}
                    onNodesDoubleClick={handleOnDoubleClick}
                />
            ))}

            {deployments.map(view => (
                <DeploymentView
                    key={view.identifier}
                    model={workspace.model}
                    configuration={workspace.views.configuration}
                    view={view}
                    onNodesDoubleClick={handleOnDoubleClick}
                />
            ))}
        </ReactFlowProvider>
    )
}