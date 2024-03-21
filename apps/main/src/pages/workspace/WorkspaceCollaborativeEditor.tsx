import { Divider } from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import {
    Shell,
    ShellBody,
    ShellCloseButton,
    ShellHeader,
    ShellPanel,
    ShellTabContent,
    ShellTitle,
} from "@restruct/ui";
import { parseStructurizr } from "@structurizr/parser";
import { useWorkspace } from "@structurizr/react";
import {
    CollaboratingUserPane,
    WorkspaceEditor,
    WorkspaceViewBreadcrumbs,
    WorkspaceViewer,
    useOnUserViewportChange,
    useOnUserViewChange,
    useOnUserAwarenessChange,
    useWorkspaceNavigation,
    useWorkspaceRoom,
    usePresentationMode,
    useUserAwareness,
    useOnFollowingUserViewportChange
} from "@workspace/react";
import { useYjsCollaborative } from "@yjs/react";
import * as Y from "yjs";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import {
    CommentThreadList,
    useCommentingMode,
    useCommentsStore
} from "../../features";
import {
    DiscussionsPane,
    PresenterInfoBar,
    WorkspaceActionsToolbar,
    WorkspaceUndoRedoControls,
    WorkspaceZoomControls
} from "./";
import { Workspace } from "@structurizr/y-workspace";

export enum WorkspaceContentMode {
    Diagramming = "diagramming",
    Modeling = "modeling",
    Deployment = "deployment"
}

export enum WorkspaceContentPanel {
    None = "none",
    Editor = "editor",
    Comments = "comments",
    Versions = "versions"
}

export const WorkspaceCollaborativeEditor: FC<PropsWithChildren> = ({ children }) => {
    const { currentView } = useWorkspaceNavigation();
    const [ structurizrCode, setStructurizrCode ] = useState("");
    // const { setViewport } = useReactFlow();
    
    const { document, setUndoManager } = useYjsCollaborative();
    const { setWorkspace } = useWorkspace();
    const { setCurrentView } = useWorkspaceNavigation();
    
    useEffect(() => {
        if (document) {
            const modelMap = document.getMap("model");
            const viewsMap = document.getMap("views");
            const propertiesMap = document.getMap("properties");
            const undoManager = new Y.UndoManager([modelMap, viewsMap, propertiesMap]);
            const workspace = new Workspace(document);
            const workspaceSnapshot = workspace.toSnapshot();
            
            setUndoManager(undoManager);
            setWorkspace(workspaceSnapshot);
            setCurrentView(workspaceSnapshot.views.systemLandscape);
        }
    }, [document, setCurrentView, setUndoManager, setWorkspace]);

    const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    const { collaboratingUsers } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo } = usePresentationMode();
    
    const currentViewUsers = useMemo(() => {
        return collaboratingUsers.filter(x => {
            return x.view?.type === currentView?.type
                && x.view?.identifier === currentView?.identifier;
        });
    }, [collaboratingUsers, currentView?.identifier, currentView?.type]);

    // useOnUserAwarenessChange({ onChange: reportMousePosition });
    // useOnUserViewportChange({ onEnd: reportViewport });
    // useOnUserViewChange({ onChange: reportView });
    // useOnFollowingUserViewportChange({ onChange: setViewport });
    
    // TODO: get selected mode from query params
    const [ mode, setMode ] = useState(WorkspaceContentMode.Diagramming);
    const isDiagrammingMode = mode === WorkspaceContentMode.Diagramming;

    // TODO: get selected panel from query params
    const [ panel, setPanel ] = useState(WorkspaceContentPanel.None);
    const isCodeEditorPanel = panel === WorkspaceContentPanel.Editor;
    const isCommentsPanel = panel === WorkspaceContentPanel.Comments;
    const isVersionHistoryPanel = panel === WorkspaceContentPanel.Versions;

    const handleOnClickPanelClose = useCallback(() => {
        setPanel(WorkspaceContentPanel.None);
    }, []);

    // SECTION: comments panel
    const { isCommentingModeEnabled } = useCommentingMode();
    const { commentThreads } = useCommentsStore();
    const currentViewDiscussions = useMemo(() => {
        return commentThreads.filter(x => {
            return x.metadata?.view?.type === currentView?.type
                && x.metadata?.view?.identifier === currentView?.identifier;
        });
    }, [commentThreads, currentView?.identifier, currentView?.type]);

    // SECTION: code editor panel
    const handleOnChangeStructurizrCode = useCallback((value: string) => {
        setStructurizrCode(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        // TODO: handle parsing errors
        setWorkspace(parseStructurizr(value));
    }, [setWorkspace]);

    return (
        <Shell>
            <ShellTabContent>
                {isVersionHistoryPanel && (
                    <ShellPanel width={"400px"}>
                        <ShellHeader>
                            <ShellTitle title={"All Discussions"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ShellBody>
                    </ShellPanel>
                )}

                {isCodeEditorPanel && (
                    <ShellPanel width={"100%"}>
                        <ShellHeader>
                            <ShellTitle title={"Code Editor"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>
                            <WorkspaceEditor
                                value={structurizrCode}
                                onChange={handleOnChangeStructurizrCode}
                            />
                        </ShellBody>
                    </ShellPanel>
                )}

                {isCommentsPanel && (
                    <ShellPanel width={"400px"}>
                        <ShellHeader>
                            <ShellTitle title={"Version History"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>

                        </ShellBody>
                    </ShellPanel>
                )}
                
                <Shell
                    outline={presentationEnabled ? `${presenterInfo?.color}.600` : undefined}
                    outlineWidth={presentationEnabled ? [2, 2, 2, 2] : [2, 2, 0, 0]}
                >
                    <WorkspaceViewer>
                        <CollaboratingUserPane users={currentViewUsers} />
                        {/* <DiscussionsPane discussions={currentViewDiscussions} /> */}
                        <PresenterInfoBar presenter={presenterInfo} />
                        <WorkspaceViewBreadcrumbs isVisible={isDiagrammingMode} />
                        <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                        <WorkspaceActionsToolbar />
                        <WorkspaceZoomControls />
                        {children}
                    </WorkspaceViewer>
                </Shell>
            </ShellTabContent>
        </Shell>
    );
}