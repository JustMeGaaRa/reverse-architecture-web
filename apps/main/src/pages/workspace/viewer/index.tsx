import { GenericView } from "@justmegaara/structurizr-dsl";
import { useWorkspaceStore, WorkspaceRenderer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { Panel } from "@reactflow/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    WorkspaceBreadcrumb,
    WorkspaceToolbar,
    WorkspaceZoom
} from "../../../containers";

export const WorkspaceViewerSheet: FC<{

}> = () => {
    const params = useParams<{ workspaceId: string }>();
    const { workspace, setWorkspace, levels, setLevels } = useWorkspaceStore();
    const [view, setView] = useState<GenericView>();

    useEffect(() => {
        const api = new WorkspaceApi();
        api.getWorkspace(params.workspaceId)
            .then(workspace => {
                const systemContextView = workspace.views.systemContexts[0];
                setWorkspace(workspace);
                setView(systemContextView);
                setLevels([{ view: systemContextView }])
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.workspaceId, setWorkspace, setView, setLevels]);

    const layout = view ? { [view.identifier]: view.layout } : undefined;

    const onNodesDoubleClick = useCallback((event: React.MouseEvent, node: any) => {
        const element = node.data.element;
        // TODO: set newly created view object as the current view (as there might be no view for the element)
        // setView({
        //     identifier: element.identifier,
        //     type: element.tags[1].name,
        //     title: `${element.tags[1].name} - ${element.name}`,
        // });
        if (element.tags.some(tag => tag.name === "Software System")) {
            const view = workspace.views.containers.find(view => view.identifier === element.identifier);
            setView(view);
            setLevels([...levels, { view }]);
        }
        if (element.tags.some(tag => tag.name === "Container")) {
            const view = workspace.views.components.find(view => view.identifier === element.identifier);
            setView(view);
            setLevels([...levels, { view }]);
        }
    }, [workspace, setView, levels, setLevels]);

    const onBreadcrumItemClick = useCallback((level) => {
        setView(level.view);
        // TODO: remove levels after the selected level
        // setLevels([...levels, level])
    }, []);

    return (
        <ContextSheet>
            {workspace && view && (
                <WorkspaceRenderer
                    workspace={workspace}
                    workspaceLayout={layout}
                    initialView={view}
                    onNodesDoubleClick={onNodesDoubleClick}
                >
                    <Panel position={"top-left"}>
                        <WorkspaceBreadcrumb
                            items={levels}
                            onClick={onBreadcrumItemClick}
                        />
                    </Panel>
                    <Panel position={"bottom-right"}>
                        <WorkspaceZoom />
                    </Panel>
                    <Panel position={"bottom-center"}>
                        <WorkspaceToolbar />
                    </Panel>
                </WorkspaceRenderer>
            )}
        </ContextSheet>
    );
};