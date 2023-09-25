import {
    Box,
    Divider,
    Flex,
    IconButton,
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
    WorkspaceCommentGroup,
    WorkspaceRoom,
    WorkspaceRoomProvider,
    WorkspaceUser
} from "../containers";
import {
    CommentApi,
    CommentThread,
    CommentProvider,
    CommentThreadList,
    CommunityHubApi,
    useAccount
} from "../features";

export const WorkspaceDiagrammingPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams ] = useSearchParams([
        ["editor", "false"],
        ["comments", "false"],
        ["settings", "false"],
    ]);
    const sidebars = {
        editor: queryParams.get("editor") === "true",
        comments: queryParams.get("comments") === "true",
        settings: queryParams.get("settings") === "true",
    };
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();

    // comment list
    const [ commentThreads, setCommentThreads ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        const api = new CommentApi();
        api.getCommentThreads(workspaceId)
            .then(comments => setCommentThreads(comments))
            .catch(error => console.error(error));
    }, [workspaceId]);

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
                <CommentProvider>
                    {sidebars.comments && (
                        <Flex direction={"column"} width={"400px"}>
                            <ContextSheetHeader>
                                <ContextSheetTitle title={"All Comments"} />
                                <ContextSheetCloseButton />
                            </ContextSheetHeader>

                            <Divider />

                            <ContextSheetBody>
                                <Box overflowY={"scroll"} height={"100%"}>
                                    <CommentThreadList commentThreads={commentThreads} />
                                </Box>
                            </ContextSheetBody>
                        </Flex>
                    )}

                    {sidebars.editor && (
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
                            <Divider
                                borderWidth={1}
                                color={"whiteAlpha.200"}
                                height={"32px"}
                                marginX={2}
                                orientation={"vertical"}
                            />
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
                                    <WorkspaceCommentGroup />
                                    <WorkspaceNavigation />
                                    <WorkspaceUndoRedoControls />
                                    <WorkspaceToolbar />
                                    <WorkspaceZoomControls />
                                    <UserCursorGroup users={users} />
                                </WorkspaceExplorer>
                            </WorkspaceRoom>
                        </WorkspaceRoomProvider>
                    </ContextSheet>

                </CommentProvider>
            </Flex>
        </ContextSheet>
    );
}