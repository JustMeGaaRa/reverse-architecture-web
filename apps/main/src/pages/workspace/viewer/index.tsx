import { IconButton, useToast } from "@chakra-ui/react";
import {
    WorkspaceNavigation,
    WorkspaceExplorer,
    WorkspaceToolbar,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import {
    ContextSheet
} from "@reversearchitecture/ui";
import {
    useWorkspaceTheme
} from "@reversearchitecture/workspace-viewer";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { AddUser } from "iconoir-react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    NavigationSource,
    useAccount,
    UserAvatarGroup,
    UserCursorGroup,
    WorkspaceRoom,
    WorkspaceRoomProvider,
    WorkspaceUser
} from "../../../containers";
import {
    CommunityHubApi
} from "../../../services";

export const WorkspaceViewerSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const [ users, setUsers ] = useState<Array<any>>([]);
    
    const { account } = useAccount();
    const { theme } = useWorkspaceTheme();
    const { parseStructurizr } = useStructurizrParser();
    const toast = useToast();

    useEffect(() => {
        const api = new CommunityHubApi();
        api.getWorkspace(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.theme ?? theme), info.metadata);
                setWorkspace(workspaceObject);
                setMetadata(info.metadata);
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
    }, [workspaceId, theme, toast, parseStructurizr]);

    return (
        <ContextSheet>
            <NavigationSource>
                <UserAvatarGroup users={users} />
                <IconButton
                    aria-label={"share"}
                    colorScheme={"gray"}
                    icon={<AddUser />}
                    size={"md"}
                />
            </NavigationSource>
            <WorkspaceRoomProvider>
                <WorkspaceRoom
                    roomId={workspaceId}
                    onChange={(users) => setUsers(users)}
                >
                    <WorkspaceUser account={account} />
                    <WorkspaceExplorer
                        workspace={workspace}
                        view={workspace.views.systemLandscape}
                        metadata={metadata}
                    >
                        <WorkspaceNavigation />
                        <WorkspaceToolbar />
                        <WorkspaceZoomControls />
                        <UserCursorGroup users={users} />
                    </WorkspaceExplorer>
                </WorkspaceRoom>
            </WorkspaceRoomProvider>
        </ContextSheet>
    );
}