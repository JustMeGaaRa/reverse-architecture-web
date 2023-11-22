import {
    Box,
    Divider,
    Flex,
    useToast
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetTitle,
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@workspace/code-editor";
import { Panel, useWorkspaceTheme } from "@workspace/core";
import {
    WorkspaceUndoRedoControls,
    WorkspaceToolbar,
    WorkspaceZoomControls,
} from "@workspace/controls";
import { WorkspaceDiagramming } from "@workspace/diagramming";
import {
    WorkspaceRoom,
    WorkspaceRoomProvider,
    WorkspaceUser
} from "@workspace/live";
import { WorkspaceModeling } from "@workspace/modeling";
import { WorkspaceNavigation } from "@workspace/navigation";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export";
import { useStructurizrParser } from "@structurizr/react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    CommentApi,
    CommentThread,
    CommentProvider,
    CommentThreadList,
    WorkspaceApi,
    useAccount,
} from "../../../features";
import {
    UserCursorGroup,
    WorkspaceCommentGroup,
    WorkspacePageLayoutContent,
    WorkspaceContentMode,
    WorkspaceContentPanel
} from "../../workspace";

export const WorkspaceContentPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "mode", WorkspaceContentMode.Diagramming ]]);
    const { parseStructurizr } = useStructurizrParser();
    const { account } = useAccount();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());

    // comment list
    const [ commentThreads, setCommentThreads ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        const api = new CommentApi();
        api.getCommentThreads(workspaceId)
            .then(comments => setCommentThreads(comments))
            .catch(error => console.error(error));
    }, [workspaceId]);

    const handleOnClosePanel = useCallback(() => {
        setQueryParam(params => {
            params.delete("panel");
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    // code editor
    const [ structurizrDslText, setStructurizrDslText ] = useState("");

    const handleOnTextChange = useCallback((value: string) => {
        setStructurizrDslText(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        setWorkspace(parseStructurizr(value));
    }, [parseStructurizr]);
    
    // workspace viewer
    // TODO: add selected repository to account provider or define repository provider
    const { workspaceApi } = useMemo(() => ({
        workspaceApi: new WorkspaceApi()
    }), []);
    const [ users, setUsers ] = useState<Array<any>>([]);
    const { theme } = useWorkspaceTheme();
    const toast = useToast();

    useEffect(() => {
        workspaceApi.getWorkspaceById(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.content?.text);
                const themedWorkspace = applyTheme(builder.toObject(), info.content?.theme ?? theme);
                const autolayoutWorkspace = applyMetadata(themedWorkspace, info.content?.metadata);
                setWorkspace(autolayoutWorkspace);
                setMetadata(info.content?.metadata);
                setStructurizrDslText(info.content?.text);
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
    }, [workspaceApi, workspaceId, theme, toast, parseStructurizr]);

    useEffect(() => {
        const viewType = queryParams.get("type");
        const viewIdentifier = queryParams.get("identifier");
        // TODO: navigate to view if type and identifier are present in the query params
    }, [queryParams]);

    const handleOnWorkspaceChange = useCallback((workspace: Workspace) => {
        const structurizrExporter = new StructurizrExportClient();
        const structurizrText = structurizrExporter.export(workspace);
        setStructurizrDslText(structurizrText);
    }, []);

    const handleOnWorkspaceViewChange = useCallback((view: any) => {
        // TODO: add view type and identifier to the query params
        setQueryParam(params => {
            params.set("view", view.identifier);
            return new URLSearchParams(params);
        })
    }, [setQueryParam]);

    return (
        <WorkspacePageLayoutContent>
            <ContextSheet>
                <Flex
                    direction={"row"}
                    height={"100%"}
                >
                    <CommentProvider>
                        {queryParams.get("panel") === WorkspaceContentPanel.Comments && (
                            <Flex direction={"column"} width={"400px"}>
                                <ContextSheetHeader>
                                    <ContextSheetCloseButton onClick={handleOnClosePanel} />
                                    <ContextSheetTitle title={"All Comments"} />
                                </ContextSheetHeader>

                                <Divider />

                                <ContextSheetBody>
                                    <Box overflowY={"scroll"} height={"100%"}>
                                        <CommentThreadList commentThreads={commentThreads} />
                                    </Box>
                                </ContextSheetBody>
                            </Flex>
                        )}

                        {queryParams.get("panel") === WorkspaceContentPanel.Editor && (
                            <Flex direction={"column"} width={"1200px"}>
                                <ContextSheetHeader>
                                    <ContextSheetCloseButton onClick={handleOnClosePanel} />
                                    <ContextSheetTitle title={"Code Editor"} />
                                </ContextSheetHeader>
            
                                <Divider />
                                
                                <ContextSheetBody>
                                    <WorkspaceEditor
                                        value={structurizrDslText}
                                        onChange={handleOnTextChange}
                                    />
                                </ContextSheetBody>
                            </Flex>
                        )}

                        {queryParams.get("panel") === WorkspaceContentPanel.Settings && (
                            <Flex direction={"column"} width={"400px"}>
                                <ContextSheetHeader>
                                    <ContextSheetCloseButton onClick={handleOnClosePanel} />
                                    <ContextSheetTitle title={"Settings"} />
                                </ContextSheetHeader>
            
                                <Divider />
                                
                                <ContextSheetBody>
                                </ContextSheetBody>
                            </Flex>
                        )}
            
                        <ContextSheet outline={queryParams.get("mode") === WorkspaceContentMode.Modeling ? "purple.600" : undefined}>
                            <WorkspaceRoomProvider>
                                <WorkspaceRoom
                                    roomId={workspaceId}
                                    onChange={(users) => setUsers(users)}
                                >
                                    <WorkspaceUser account={account as any} />

                                    {queryParams.get("mode") === WorkspaceContentMode.Diagramming && (
                                        <WorkspaceDiagramming
                                            workspace={workspace}
                                            view={workspace.views.systemLandscape}
                                            metadata={metadata}
                                            onWorkspaceChange={handleOnWorkspaceChange}
                                            onWorkspaceViewChange={handleOnWorkspaceViewChange}
                                        >
                                            <WorkspaceCommentGroup commentThreads={commentThreads} />
                                            <UserCursorGroup users={users} />
                                            
                                            <Panel position={"top-left"}>
                                                <WorkspaceNavigation />
                                            </Panel>
                                            <Panel position={"bottom-left"}>
                                                <WorkspaceUndoRedoControls />
                                            </Panel>
                                            <Panel position={"bottom-center"}>
                                                <WorkspaceToolbar />
                                            </Panel>
                                            <Panel position={"bottom-right"}>
                                                <WorkspaceZoomControls />
                                            </Panel>
                                        </WorkspaceDiagramming>
                                    )}

                                    {queryParams.get("mode") === WorkspaceContentMode.Modeling && (
                                        <WorkspaceModeling
                                            workspace={workspace}
                                            onWorkspaceChange={handleOnWorkspaceChange}
                                        >
                                            <Panel position={"top-left"}>
                                                <WorkspaceNavigation />
                                            </Panel>
                                            <Panel position={"bottom-left"}>
                                                <WorkspaceUndoRedoControls />
                                            </Panel>
                                            <Panel position={"bottom-right"}>
                                                <WorkspaceZoomControls />
                                            </Panel>
                                        </WorkspaceModeling>
                                    )}
                                </WorkspaceRoom>
                            </WorkspaceRoomProvider>
                        </ContextSheet>

                    </CommentProvider>
                </Flex>
            </ContextSheet>
        </WorkspacePageLayoutContent>
    );
}