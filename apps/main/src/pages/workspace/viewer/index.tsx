import { useWorkspaceStore, WorkspaceExplorer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { Panel } from "@reactflow/core";
import { FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    WorkspaceBreadcrumb,
    WorkspaceToolbar,
    WorkspaceZoom
} from "../../../containers";
import { GenericView } from "@justmegaara/structurizr-dsl";

export const WorkspaceViewerSheet: FC<{

}> = () => {
    const params = useParams<{ workspaceId: string }>();
    const {
        workspace,
        selectedView,
        viewPath,
        setWorkspace,
        setSelectedView
    } = useWorkspaceStore();

    useEffect(() => {
        const api = new WorkspaceApi();
        api.getWorkspace(params.workspaceId)
            .then(workspace => {
                setWorkspace(workspace);
                setSelectedView(workspace.views.systemContexts[0])
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.workspaceId, setSelectedView, setWorkspace]);

    useEffect(() => {
        // const api = new WorkspaceApi();
        // api.getWorkspaceLayout(params.workspaceId)
        //     .then(layout => {
        //         setSelectedView(workspace.views.systemContexts[0]);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }, [params.workspaceId, workspace, setSelectedView]);

    const onNodesDoubleClick = useCallback((_event: React.MouseEvent, node: any) => {
        const element = node.data.element;
        
        // do not handle the click for component elements as there is no such view type
        if (!element.tags.some(tag => tag.name === "Component")) {
            const currentView: GenericView = {
                identifier: element.identifier,
                type: element.tags.some(tag => tag.name === "Software System")
                    ? "Container"
                    : "Component",
                title: element.name,
            };
            const selectedView = workspace.views.systemLandscape?.type === currentView.type
                ? workspace.views.systemLandscape
                : workspace.views.systemContexts.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                    ?? workspace.views.containers.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                    ?? workspace.views.components.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                    ?? currentView;
            
            setSelectedView(selectedView);
        }
    }, [workspace, setSelectedView]);

    const onBreadcrumItemClick = useCallback((view) => {
        const selectedView = workspace.views.systemLandscape?.type === view.type
            ? workspace.views.systemLandscape
            : workspace.views.systemContexts.find(x => x.type === view.type && x.identifier === view.identifier)
                ?? workspace.views.containers.find(x => x.type === view.type && x.identifier === view.identifier)
                ?? workspace.views.components.find(x => x.type === view.type && x.identifier === view.identifier)
                ?? view;

        setSelectedView(selectedView);
    }, [workspace, setSelectedView]);

    return (
        <ContextSheet>
            {workspace && selectedView && (
                <WorkspaceExplorer
                    workspace={workspace}
                    initialView={selectedView}
                    onNodesDoubleClick={onNodesDoubleClick}
                >
                    {viewPath && (
                        <Panel position={"top-left"}>
                            <WorkspaceBreadcrumb
                                path={viewPath.path}
                                onClick={onBreadcrumItemClick}
                            />
                        </Panel>
                    )}
                    <Panel position={"bottom-right"}>
                        <WorkspaceZoom />
                    </Panel>
                    <Panel position={"bottom-center"}>
                        <WorkspaceToolbar />
                    </Panel>
                </WorkspaceExplorer>
            )}
        </ContextSheet>
    );
};