import { IconButton, useToast } from "@chakra-ui/react";
import {
    useMetadata,
    WorkspaceBreadcrumbs,
    WorkspaceExplorer,
    WorkspaceToolbar,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import { ContextSheet } from "@reversearchitecture/ui";
import {
    applyMetadata,
    applyTheme,
    IView,
    IWorkspaceMetadata,
    Workspace
} from "@structurizr/dsl";
import { ReactFlowInstance } from "@reactflow/core";
import { useStructurizrParser } from "@structurizr/react";
import { AddUser } from "iconoir-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import {
    useAccount,
    useNavigationContext,
    UserAvatarGroup,
    UserCursorGroup,
    useWorkspaceTheme,
    WorkspaceRoom
} from "../../../containers";
import { CommunityHubApi } from "../../../services";
import { useSelfPresence } from "../../../hooks";

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
    const { setSelfPoint, setSelfPresence } = useSelfPresence();

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
            setSelfPresence(provider.awareness, account);
    
            setAvailableActions([
                (
                    <UserAvatarGroup
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
    }, [account, provider, setSelfPresence, setAvailableActions]);

    const [ reactFlow, setReactFlow ] = useState<ReactFlowInstance>();

    const handleOnInitialize = useCallback((instance: ReactFlowInstance) => {
        setReactFlow(instance);
    }, [setReactFlow])

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any) => {
        setMetadata(applyElementPosition(
            metadata,
            selectedView,
            node.data.element.identifier,
            node.position
        ));
    }, [metadata, selectedView, applyElementPosition]);

    const handleOnMouseMove = useCallback((event: any) => {
        if (reactFlow) {
            setSelfPoint(provider?.awareness, event.viewportPoint)
        }
    }, [provider, reactFlow, setSelfPoint]);

    return (
        <ContextSheet>
            <WorkspaceRoom>
                <WorkspaceExplorer
                    workspace={workspace}
                    selectedView={selectedView}
                    onInitialize={handleOnInitialize}
                    onNodeDragStop={handleOnNodeDragStop}
                    onMouseMove={handleOnMouseMove}
                >
                    <WorkspaceBreadcrumbs />
                    <WorkspaceToolbar />
                    <WorkspaceZoomControls />
                    {provider && reactFlow &&  (
                        <UserCursorGroup
                            awareness={provider.awareness}
                            viewport={reactFlow.getViewport()}
                        />
                    )}
                </WorkspaceExplorer>
            </WorkspaceRoom>
        </ContextSheet>
    );
}