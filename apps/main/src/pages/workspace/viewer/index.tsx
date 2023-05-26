import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { useMetadata, WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { CommunityHubApi } from "@reversearchitecture/services";
import { ContextSheet } from "@reversearchitecture/ui";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    applyMetadata,
    applyTheme,
    IView,
    IWorkspaceMetadata,
    Workspace
} from "@structurizr/dsl";
import { useToast } from "@chakra-ui/react";
import { useStructurizrParser } from "@structurizr/react";

export const WorkspaceViewerSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IView>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();

    const { applyElementPosition } = useMetadata();
    const parseWorkspace = useStructurizrParser();
    const toast = useToast();

    const applyWorkspace = useCallback((workspace: Workspace, metadata?: IWorkspaceMetadata) => {
        const updatedWorkspace = metadata
            ? applyMetadata(workspace, metadata)
            : workspace;

        setWorkspace(updatedWorkspace);
        setSelectedView(selectedView
            ?? updatedWorkspace.views.systemLandscape
            ?? updatedWorkspace.views.systemContexts[0]
            ?? updatedWorkspace.views.containers[0]
            ?? updatedWorkspace.views.components[0]
            ?? updatedWorkspace.views.deployments[0]);
    }, [selectedView, setSelectedView, setWorkspace]);

    useEffect(() => {
        const fetchWorkspace = async (workspaceId: string) => {
            const api = new CommunityHubApi();
            const workspaceText = await api.getWorkspaceText(workspaceId);
            const workspaceMetadata = await api.getWorkspaceMetadata(workspaceId);
            const theme = await api.getWorkspaceTheme(workspaceId);

            return { text: workspaceText, metadata: workspaceMetadata, theme: theme };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata, theme }) => {
                applyWorkspace(applyTheme(parseWorkspace(text), theme), metadata);
                setMetadata(metadata);
            })
            .catch(error => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-right"
                })
            })
    }, [workspaceId, toast, applyWorkspace, setMetadata, parseWorkspace]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any) => {
        const emptyMetadata = {
            name: "",
            lastModifiedDate: new Date(),
            views: {
                systemLandscape: undefined,
                systemContexts: [],
                containers: [],
                components: [],
                deployments: []
            }
        };
        const updatedMetadata = applyElementPosition(
            metadata ?? emptyMetadata,
            selectedView,
            node.data.element.identifier,
            node.position
        );
        setMetadata(updatedMetadata);
    }, [metadata, selectedView, applyElementPosition]);

    return (
        <ContextSheet>
            <WorkspaceExplorer
                workspace={workspace}
                selectedView={selectedView}
                onNodeDragStop={handleOnNodeDragStop}
            >
                <WorkspaceBreadcrumb />
                <WorkspaceToolbar />
                <WorkspaceZoom />
            </WorkspaceExplorer>
        </ContextSheet>
    );
};