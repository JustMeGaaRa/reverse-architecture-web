import { Avatar, AvatarGroup, IconButton, useToast } from "@chakra-ui/react";
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
import { AddUser } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Awareness } from "y-protocols/awareness";
import { useAccount, useNavigationContext, useWorkspaceTheme } from "../../../containers";
import { CommunityHubApi } from "../../../services";
import { useUserPresence } from "../../../hooks";

export const WorkspaceViewerSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IView>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();
    const { theme } = useWorkspaceTheme();
    const { applyElementPosition } = useMetadata();

    const parseWorkspace = useStructurizrParser();
    const toast = useToast();

    const applyWorkspace = useCallback((workspace: Workspace) => {
        setWorkspace(workspace);
        setSelectedView(selectedView
            ?? workspace.views.systemLandscape
            ?? workspace.views.systemContexts[0]
            ?? workspace.views.containers[0]
            ?? workspace.views.components[0]
            ?? workspace.views.deployments[0]);
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
                applyWorkspace(applyTheme(applyMetadata(parseWorkspace(text), metadata), theme));
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
    
    const { setAvailableActions } = useNavigationContext();
    const { account } = useAccount();
    const [ ydoc, setYdoc ] = useState<Y.Doc>();
    const [ provider, setProvider ] = useState<WebrtcProvider>();

    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider(workspaceId, ydoc);

        setYdoc(ydoc);
        setProvider(provider);

        return () => {
            ydoc.destroy();
            provider.disconnect();
            provider.destroy();
        }
    }, [workspaceId, setYdoc, setProvider]);

    useEffect(() => {
        if(provider) {
            provider.awareness.setLocalState(account);
    
            setAvailableActions([
                (
                    <OnlineUsers
                        key={"users-online"}
                        awareness={provider.awareness}
                    />
                ),
                (
                    <IconButton
                        key={"users-add"}
                        aria-label={"share"}
                        colorScheme={"gray"}
                        icon={<AddUser />}
                        size={"md"}
                    />
                )
            ]);
        }
    }, [account, provider, setAvailableActions]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any) => {
        setMetadata(applyElementPosition(
            metadata,
            selectedView,
            node.data.element.identifier,
            node.position
        ));
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

const OnlineUsers: FC<{ awareness: Awareness }> = ({ awareness }) => {
    const { users } = useUserPresence(awareness);
    const colorSchemes = [
        "blue",
        "green",
        "red",
        "orange",
        "yellow",
        "purple",
    ]

    return (
        <AvatarGroup max={5} cursor={"pointer"}>
            {users.map((user, index) => (
                <Avatar
                    key={user.username}
                    colorScheme={colorSchemes[index % colorSchemes.length]}
                    name={user.fullname}
                    src={user.avatarUrl}
                    title={user.fullname}
                />
            ))}
        </AvatarGroup>
    )
}