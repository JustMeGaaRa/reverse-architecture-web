import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import { WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { CommunityHubApi } from "@reversearchitecture/services";
import { createYDoc } from "@reversearchitecture/utils";
import { IView, IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ActivityPanel, WorkspaceRoomProvider } from "../../containers";
import { createRandomUser } from "../../utils/User";

export const Sandbox: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ store, setStore ] = useState(null);
    const [ user, setUser ] = useState(null);
    
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IView>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();

    const parseWorkspace = useStructurizrParser();
    
    const toast = useToast();

    useEffect(() => {
        const store = createYDoc({ documentId: workspaceId });
        const user = createRandomUser();

        setStore(store);
        setUser(user);

        return () => {
            store.document.destroy();
            store.provider.disconnect();
            store.provider.destroy();
        }
    }, [workspaceId]);

    const applyWorkspace = useCallback((workspace: Workspace, metadata?: IWorkspaceMetadata) => {
        const updatedWorkspace = metadata
            ? Workspace.applyMetadata(workspace, metadata)
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

            return { text: workspaceText, metadata: workspaceMetadata };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata }) => {
                applyWorkspace(parseWorkspace(text), metadata);
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

    return (
        <Box
            height={"100vh"}
            background={useColorModeValue("", "#1E1E1E")}
        >
            {store && user && workspace && (
                <WorkspaceRoomProvider {...store} user={user}>
                    <WorkspaceExplorer
                        workspace={workspace}
                        selectedView={selectedView}
                    >
                        <WorkspaceBreadcrumb />
                        <WorkspaceToolbar />
                        <WorkspaceZoom />
                        <ActivityPanel />
                    </WorkspaceExplorer>
                </WorkspaceRoomProvider>
            )}
        </Box>
    );
};
