import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { useWorkspaceStore, WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { CommunityHubApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { Panel } from "@reactflow/core";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

export const WorkspaceViewerSheet: FC<{

}> = ({
    
}) => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const {
        workspace,
        selectedView,
        viewPath,
        setWorkspace,
        setSelectedView
    } = useWorkspaceStore();

    useEffect(() => {
        const api = new CommunityHubApi();
        api.getWorkspace(workspaceId)
            .then(workspace => {
                const initialView = workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0];
                setWorkspace(workspace);
                setSelectedView(initialView);
            })
            .catch(error => {
                console.error(error);
            });
    }, [workspaceId, setSelectedView, setWorkspace]);

    return (
        <ContextSheet>
            {workspace && selectedView && (
                <WorkspaceExplorer
                    workspace={workspace}
                    initialView={selectedView}
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