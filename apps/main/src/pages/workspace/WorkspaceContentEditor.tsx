import { Divider, Flex, HStack, Icon, IconButton } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetTitle,
    usePageHeader,
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@workspace/code-editor";
import { useWorkspace } from "@workspace/core";
import { WorkspaceDiagramming } from "@workspace/diagramming";
import { CurrentUser, CollaboratingUserPane, useWorkspaceRoom } from "@workspace/live";
import { WorkspaceModeling } from "@workspace/modeling";
import { WorkspaceViewPath } from "@workspace/navigation";
import { Workspace } from "@structurizr/dsl";
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
    CommentThreadList,
    useAccount,
} from "../../features";
import {
    DiscussionsPane,
    WorkspaceContentMode,
    WorkspaceContentPanel,
    UserAvatarGroup,
    WorkspaceDiagrammingToolbar,
    WorkspaceModelingToolbar,
    WorkspaceUndoRedoControls,
    WorkspaceZoomControls
} from "./";
import { UserPlus } from "iconoir-react";

export const WorkspaceContentEditor: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "mode", WorkspaceContentMode.Diagramming ]]);
    const { setHeaderContent } = usePageHeader();
    const [ structurizrDslText, setStructurizrDslText ] = useState("");
    const { parseStructurizr } = useStructurizrParser();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentUser, collaboratingUsers } = useWorkspaceRoom();
    const { users } = useMemo(() => {
        return {
            users: currentUser !== null && currentUser !== undefined
                ? collaboratingUsers.concat(currentUser).map(user => user.info)
                : collaboratingUsers.map(user => user.info)
        }
    },
    [currentUser, collaboratingUsers]);
    
    // set header content
    useEffect(() => {
        setHeaderContent({
            right: (
                <HStack key={"workspace-page-options"} gap={2} mr={4}>
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
                        icon={<Icon as={UserPlus} boxSize={5} />}
                        isDisabled
                        size={"md"}
                    />
                </HStack>
            )
        })
    }, [setHeaderContent, users])

    // discussions
    const [ commentThreads, setCommentThreads ] = useState<Array<CommentThread>>([]);
    const { commentApi } = useMemo(() => ({ commentApi: new CommentApi() }), []);

    useEffect(() => {
        commentApi.getDiscussions(workspaceId)
            .then(comments => setCommentThreads(comments))
            .catch(error => console.error(error));
    }, [workspaceId, commentApi]);

    const handleOnClosePanel = useCallback(() => {
        setQueryParam(params => {
            params.delete("panel");
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    // code editor
    const handleOnTextChange = useCallback((value: string) => {
        setStructurizrDslText(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        setWorkspace(parseStructurizr(value));
    }, [parseStructurizr, setWorkspace]);
    
    // workspace
    useEffect(() => {
        // TODO: navigate to view if type and identifier are present in the query params
        const viewType = queryParams.get("type");
        const viewIdentifier = queryParams.get("identifier");
    }, [queryParams]);

    const handleOnWorkspaceChange = useCallback((workspace: Workspace) => {
        // TODO: set structurizr dsl code to a respective provider
        // const structurizrExporter = new StructurizrExportClient();
        // setStructurizrDslText(structurizrText);

        // NOTE: when the workspace is changed internally, we need to save it for further updates
        setWorkspace(workspace);
    }, [setWorkspace]);

    const handleOnWorkspaceViewChange = useCallback((view: any) => {
        // TODO: add view type and identifier to the query params
        setQueryParam(params => {
            params.set("type", view.type);
            params.set("identifier", view.identifier);
            return new URLSearchParams(params);
        })
    }, [setQueryParam]);
    
    // TODO: consider cleaning up and moving user creation somewhere else
    const { account } = useAccount();
    const currentUserInfo = useMemo(() => {
        const colorSchemes = [ "gray", "red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple", "pink"];
        return {
            ...account,
            color: colorSchemes.at(Math.floor(Math.random() * colorSchemes.length))
        }
    }, [account]);

    const isDiagrammingMode = useMemo(() => queryParams.get("mode") === WorkspaceContentMode.Diagramming, [queryParams]);
    const isModelingMode = useMemo(() => queryParams.get("mode") === WorkspaceContentMode.Modeling, [queryParams]);;
    const diagrammingDiscussions = useMemo(() => commentThreads.filter(x => x.metadata?.view?.type !== "Model"), [commentThreads]);
    const modelingDiscussions = useMemo(() => commentThreads.filter(x => x.metadata?.view?.type === "Model"), [commentThreads]);

    return (
        <ContextSheet>
            <Flex direction={"row"} height={"100%"}>
                {queryParams.get("panel") === WorkspaceContentPanel.Comments && (
                    <Flex direction={"column"} width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"All Discussions"} />
                        </ContextSheetHeader>

                        <Divider />

                        <ContextSheetBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ContextSheetBody>
                    </Flex>
                )}

                {queryParams.get("panel") === WorkspaceContentPanel.Editor && (
                    <Flex direction={"column"} width={"100%"}>
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
                            <ContextSheetTitle title={"Version History"} />
                        </ContextSheetHeader>
    
                        <Divider />
                        
                        <ContextSheetBody>
                        </ContextSheetBody>
                    </Flex>
                )}
    
                <ContextSheet>
                    {isDiagrammingMode && (
                        <WorkspaceDiagramming
                            workspace={workspace}
                            initialView={workspace.views.systemLandscape}
                            onWorkspaceChange={handleOnWorkspaceChange}
                            onWorkspaceViewChange={handleOnWorkspaceViewChange}
                        >
                            <CurrentUser info={currentUserInfo} />
                            <CollaboratingUserPane users={collaboratingUsers} />
                            <DiscussionsPane discussions={diagrammingDiscussions} />
                            <WorkspaceViewPath workspace={workspace} />
                            <WorkspaceUndoRedoControls />
                            <WorkspaceDiagrammingToolbar />
                            <WorkspaceZoomControls />
                        </WorkspaceDiagramming>
                    )}

                    {isModelingMode && (
                        <WorkspaceModeling
                            workspace={workspace}
                            onWorkspaceChange={handleOnWorkspaceChange}
                        >
                            <CurrentUser info={currentUserInfo} />
                            <CollaboratingUserPane users={collaboratingUsers} />
                            <DiscussionsPane discussions={modelingDiscussions} />
                            <WorkspaceUndoRedoControls />
                            <WorkspaceModelingToolbar />
                            <WorkspaceZoomControls />
                        </WorkspaceModeling>
                    )}
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
}