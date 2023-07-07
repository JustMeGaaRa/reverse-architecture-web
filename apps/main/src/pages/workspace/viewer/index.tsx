import { IconButton, useToast } from "@chakra-ui/react";
import {
    getView,
    getViewPath,
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
    IViewDefinition,
    ViewKeys,
    IWorkspaceMetadata,
    Tag,
    ViewType,
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
    const [ selectedView, setSelectedView ] = useState<IViewDefinition>();
    const [ path, setPath ] = useState<Array<ViewKeys>>([]);
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();
    const { theme } = useWorkspaceTheme();
    const { applyElementPosition } = useMetadata();

    const parseWorkspace = useStructurizrParser();
    const toast = useToast();

    useEffect(() => {
        const fetchWorkspace = async (workspaceId: string) => {
            const api = new CommunityHubApi();
            const workspaceText = await api.getWorkspaceText(workspaceId);
            const workspaceMetadata = await api.getWorkspaceMetadata(workspaceId);
            const theme = await api.getWorkspaceTheme(workspaceId);

            return { text: workspaceText, metadata: workspaceMetadata, theme: theme };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata }) => {
                const workspace = parseWorkspace(text);
                setWorkspace(applyMetadata(applyTheme(workspace, theme), metadata));
                setMetadata(metadata);
                setSelectedView(workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0]
                    ?? workspace.views.containers[0]
                    ?? workspace.views.components[0]
                    ?? workspace.views.deployments[0]);
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
    }, [workspaceId, theme, toast, parseWorkspace]);
    
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
    }, [setReactFlow]);

    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: any) => {
        const element = node.data.element;

        // do not handle the click for component elements as there is no such view type
        if (!element.tags.some(tag => tag.name === Tag.Person.name || tag.name === Tag.Component.name)) {
            setSelectedView({
                identifier: element.identifier,
                type: element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)
                    ? ViewType.Container
                    : ViewType.Component,
                title: element.name,
                elements: [],
                relationships: []
            });
        }
    }, [setSelectedView]);

    const handleOnViewItemClick = useCallback((view: ViewKeys) => {
        setSelectedView(getView(workspace, view));
        setPath(getViewPath(workspace, view));
    }, [setSelectedView, workspace]);

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
                    onNodesDoubleClick={handleOnDoubleClick}
                    onNodeDragStop={handleOnNodeDragStop}
                    onMouseMove={handleOnMouseMove}
                >
                    <WorkspaceBreadcrumbs
                        path={path}
                        onItemClick={handleOnViewItemClick}
                    />
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