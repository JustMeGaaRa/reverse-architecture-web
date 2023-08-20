import { IconButton, useToast } from "@chakra-ui/react";
import {
    WorkspaceBreadcrumbs,
    WorkspaceExplorer,
    WorkspaceToolbar,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import { ContextSheet } from "@reversearchitecture/ui";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { AddUser } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
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
    
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    
    const { theme } = useWorkspaceTheme();
    const { parseStructurizr } = useStructurizrParser();
    const toast = useToast();

    // TODO: move this to react loader feature
    useEffect(() => {
        const fetchWorkspace = async (workspaceId: string) => {
            const api = new CommunityHubApi();
            const structurizrDslText = await api.getWorkspaceText(workspaceId);
            const workspaceMetadata = await api.getWorkspaceMetadata(workspaceId);

            return { structurizrDslText, workspaceMetadata };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ structurizrDslText, workspaceMetadata }) => {
                const builder = parseStructurizr(structurizrDslText);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), theme), workspaceMetadata);
                setWorkspace(workspaceObject);
                setMetadata(workspaceMetadata);
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
        // setWorkspace(Workspace.Empty);
    }, [workspaceId, theme, toast, parseStructurizr]);
    
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

    const handleOnMouseMove = useCallback((event: any) => {
        setSelfPoint(provider?.awareness, event.viewportPoint)
    }, [provider, setSelfPoint]);

    return (
        <ContextSheet>
            <WorkspaceRoom>
                <WorkspaceExplorer
                    workspace={workspace}
                    metadata={metadata}
                    // onMouseMove={handleOnMouseMove}
                >
                    <WorkspaceBreadcrumbs />
                    <WorkspaceToolbar />
                    <WorkspaceZoomControls />
                    {/* {provider && (
                        <UserCursorGroup awareness={provider.awareness} />
                    )} */}
                </WorkspaceExplorer>
            </WorkspaceRoom>
        </ContextSheet>
    );
}