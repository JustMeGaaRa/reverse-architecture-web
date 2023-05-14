import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { CommunityHubApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IView, Workspace } from "@structurizr/dsl";
import { useToast } from "@chakra-ui/react";

export const WorkspaceViewerSheet: FC<{

}> = ({
    
}) => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [workspace, setWorkspace] = useState(Workspace.Empty);
    const [selectedView, setSelectedView] = useState<IView>();
    const toast = useToast();

    useEffect(() => {
        const api = new CommunityHubApi();
        api.getWorkspace(workspaceId)
            .then(workspace => {
                const initialView = workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0]
                    ?? workspace.views.containers[0]
                    ?? workspace.views.components[0]
                    ?? workspace.views.deployments[0];
                setWorkspace(workspace);
                setSelectedView(initialView);
            })
            .catch(_ => {
                toast({
                    title: "Error",
                    description: "Failed to load workspace",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-right"
                })
            });
    }, [workspaceId, setSelectedView, setWorkspace, toast]);

    return (
        <ContextSheet>
            <WorkspaceExplorer
                workspace={workspace}
                initialView={selectedView}
            >
                <WorkspaceBreadcrumb />
                <WorkspaceToolbar />
                <WorkspaceZoom />
            </WorkspaceExplorer>
        </ContextSheet>
    );
};