import { useToast } from "@chakra-ui/react";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { useMetadata, WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { ContextSheet } from "@reversearchitecture/ui";
import {
    applyMetadata,
    applyTheme,
    IView,
    IWorkspaceMetadata,
    Workspace
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { RoomProvider } from "@y-presence/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkspaceTheme } from "../../../containers";
import { useAccount, useUserPresence, useWebrtcProvider, useYDoc } from "../../../hooks";
import { CommunityHubApi } from "../../../services";
import { useOnlineUsersStore } from "../../../hooks/useOnlineUsersStore";

export const WorkspaceViewerSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IView>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();
    const { theme } = useWorkspaceTheme();
    const { applyElementPosition } = useMetadata();
    
    const { account } = useAccount();
    const { setUsers } = useOnlineUsersStore();
    // const { ydoc } = useYDoc();
    // const { provider } = useWebrtcProvider(ydoc, workspaceId);

    useEffect(() => {
        setUsers([{
            avatarUrl: account?.avatar,
            color: "green",
            fullname: account?.fullname,
            username: account?.username,
            isActive: true,
            point: { x: 0, y: 0 }
        }])
    }, [account, setUsers]);

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

            return { text: workspaceText, metadata: workspaceMetadata };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata }) => {
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
    }, [workspaceId, theme, toast, applyWorkspace, setMetadata, parseWorkspace]);

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
            {/* <RoomProvider initialPresence={account} awareness={provider.awareness}> */}
                <WorkspaceExplorer
                    workspace={workspace}
                    selectedView={selectedView}
                    onNodeDragStop={handleOnNodeDragStop}
                >
                    <WorkspaceBreadcrumb />
                    <WorkspaceToolbar />
                    <WorkspaceZoom />
                </WorkspaceExplorer>
            {/* </RoomProvider> */}
        </ContextSheet>
    );
};