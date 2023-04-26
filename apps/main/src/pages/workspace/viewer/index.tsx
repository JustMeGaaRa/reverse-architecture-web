import { IView, ViewType } from "@structurizr/dsl";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { useWorkspaceStore, WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { WorkspaceApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { Panel } from "@reactflow/core";
import { FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export const WorkspaceViewerSheet: FC<{

}> = ({
    
}) => {
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
                const initialView = workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0];
                setWorkspace(workspace);
                setSelectedView(initialView);
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.workspaceId, setSelectedView, setWorkspace]);

    const onNodesDoubleClick = useCallback((_event: React.MouseEvent, node: any) => {
        const element = node.data.element;

        if (element.tags.some(tag => tag.name === "Person")
            || element.tags.some(tag => tag.name === "Component")) {
            return;
        }
        
        // do not handle the click for component elements as there is no such view type
        if (!element.tags.some(tag => tag.name === "Component")) {
            const type = element.tags.some(tag => tag.name === "Software System")
                ? ViewType.Container
                : ViewType.Component;
            const currentView: IView = {
                identifier: element.identifier,
                type: type,
                title: element.name,
                layout: {}
            };
            const selectedView = 
                workspace.views.systemContexts.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                ?? workspace.views.containers.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                ?? workspace.views.components.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
                ?? currentView;

            setSelectedView(selectedView);
        }
    }, [workspace, setSelectedView]);

    return (
        <ContextSheet>
            {workspace && selectedView && (
                <WorkspaceExplorer
                    workspace={workspace}
                    initialView={selectedView}
                    onNodesDoubleClick={onNodesDoubleClick}
                >
                    <Panel position={"top-left"}>
                        <WorkspaceBreadcrumb path={viewPath.path} />
                    </Panel>
                    <Panel position={"bottom-center"}>
                        <WorkspaceToolbar />
                    </Panel>
                    <Panel position={"bottom-right"}>
                        <WorkspaceZoom />
                    </Panel>
                </WorkspaceExplorer>
            )}
        </ContextSheet>
    );
};