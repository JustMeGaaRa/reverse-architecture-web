import {
    Box,
    Divider,
    Flex,
    IconButton,
    List,
    ListItem,
    useToast
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetTitle
} from "@reversearchitecture/ui";
import {
    WorkspaceNavigation,
    WorkspaceExplorer,
    WorkspaceToolbar,
    WorkspaceZoomControls,
    useWorkspaceTheme,
    WorkspaceUndoRedoControls
} from "@reversearchitecture/workspace-viewer";
import {
    WorkspaceEditor
} from "@reversearchitecture/workspace-editor";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { AddUser } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    NavigationSource,
    UserAvatarGroup,
    UserCursorGroup,
    WorkspaceRoom,
    WorkspaceRoomProvider,
    WorkspaceUser
} from "../containers";
import {
    CommentApi,
    CommentThread,
    CommentThreadGroup,
    CommentsProvider,
    CommentList,
    CommunityHubApi,
    WorkspaceApi,
    WorkspaceInfo,
    useAccount
} from "../features";

export const WorkspaceExplorerPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams, setQueryParams ] = useSearchParams([
        ["list", "false"],
        ["comments", "false"],
        ["editor", "false"],
        ["settings", "false"]
    ]);
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    const state = {
        showWorkspaces: queryParams.get("list") === "true",
        showComments: queryParams.get("comments") === "true",
        showCodeEditor: queryParams.get("editor") === "true",
        showSettings: queryParams.get("settings") === "true"
    };

    // comment list
    const [ commentThreads, setCommentThreads ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        const api = new CommentApi();
        api.getComments(workspaceId)
            .then(comments => setCommentThreads(comments))
            .catch(error => console.error(error));
    }, [workspaceId]);
    
    // workspace list
    const { projectId } = useParams<{ projectId: string }>();
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);

    useEffect(() => {
        const workspaceApi = new WorkspaceApi();
        workspaceApi.getWorkspaces(projectId)
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [projectId]);

    // code editor
    const [ text, setText ] = useState("");

    const handleOnChange = useCallback((value: string) => {
        setText(value);
        setWorkspace(parseStructurizr(text));
    }, [parseStructurizr, text]);
    
    // workspace viewer
    const [ users, setUsers ] = useState<Array<any>>([]);
    
    const { account } = useAccount();
    const { theme } = useWorkspaceTheme();
    const toast = useToast();

    useEffect(() => {
        const communityApi = new CommunityHubApi();
        communityApi.getWorkspace(workspaceId)
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
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <CommentsProvider>
                    {state.showComments && (
                        <Flex direction={"column"} width={"400px"}>
                            <ContextSheetHeader>
                                <ContextSheetTitle title={"All Comments"} />
                                <ContextSheetCloseButton />
                            </ContextSheetHeader>

                            <Divider />

                            <ContextSheetBody>
                                <Box overflowY={"scroll"} height={"100%"}>
                                    <CommentList commentThreads={commentThreads} />
                                </Box>
                            </ContextSheetBody>
                        </Flex>
                    )}
                    
                    {state.showWorkspaces && (
                        <Flex direction={"column"} width={"400px"}>
                            <ContextSheetHeader>
                                <ContextSheetTitle title={"Workspaces"} />
                                <ContextSheetCloseButton />
                            </ContextSheetHeader>

                            <Divider />

                            <ContextSheetBody>
                                <Box overflowY={"scroll"} height={"100%"} padding={2} gap={1}>
                                    <List>
                                        {workspaces.map(workspace => (
                                            <ListItem
                                                key={workspace.workspaceId}
                                                aria-label={workspace.name}
                                                cursor={"pointer"}
                                                display={"block"}
                                                title={workspace.name}
                                            >
                                                {workspace.name}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </ContextSheetBody>
                        </Flex>
                    )}

                    {state.showCodeEditor && (
                        <Flex direction={"column"} width={"1200px"}>
                            <ContextSheetHeader>
                                <ContextSheetTitle title={"Code Editor"} />
                                <ContextSheetCloseButton />
                            </ContextSheetHeader>
        
                            <Divider />
                            
                            <ContextSheetBody>
                                <WorkspaceEditor
                                    value={text}
                                    onChange={handleOnChange}
                                />
                            </ContextSheetBody>
                        </Flex>
                    )}
        
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
                                    <CommentThreadGroup />
                                    <WorkspaceNavigation />
                                    <WorkspaceUndoRedoControls />
                                    <WorkspaceToolbar />
                                    <WorkspaceZoomControls />
                                    <UserCursorGroup users={users} />
                                </WorkspaceExplorer>
                            </WorkspaceRoom>
                        </WorkspaceRoomProvider>
                    </ContextSheet>

                </CommentsProvider>
            </Flex>
        </ContextSheet>
    );
}