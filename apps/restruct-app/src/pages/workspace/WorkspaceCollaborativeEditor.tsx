import { Divider } from "@chakra-ui/react";
import { StructurizrEditor } from "@monaco-editor/structurizr";
import { createDefaultWorkspace, IWorkspaceSnapshot } from "@structurizr/dsl";
import {
    Shell,
    ShellBody,
    ShellCloseButton,
    ShellHeader,
    ShellPanel,
    ShellTabContent,
    ShellTitle
} from "@restruct/ui";
import {
    ActionType,
    combineReducers,
    workspaceReducer
} from "@workspace/core";
import { Workspace } from "@structurizr/y-workspace";
import {
    CollaboratingUserPane,
    useOnWorkspaceSync,
    usePresentationMode,
    useUserAwareness,
    useWorkspaceRoom
} from "@workspace/live";
import { useYjsCollaborative } from "@yjs/react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState
} from "react";
import * as Y from "yjs";
import { CommentThreadList } from "../../features";
import {
    useWorkspaceEditorState,
    useWorkspaceNavigation,
    WorkspaceActionsToolbar,
    workspaceFlowReducer,
    WorkspacePresenterInfo,
    WorkspaceRenderer,
    WorkspaceUndoRedoControls,
    WorkspaceViewBreadcrumbs,
    WorkspaceZoomControls
} from "@workspace/controls";

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

export const WorkspaceCollaborativeEditor: FC = () => {
    const { document, setUndoManager } = useYjsCollaborative();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    
    const { presentationEnabled, presenterInfo } = usePresentationMode();
    
    // TODO: move workspace reducer to WorkspaceProvider and useWorkspace hook
    const [ workspace, dispatch ] = useReducer(
        combineReducers(
            workspaceReducer,
            workspaceFlowReducer,
            // createCollaborativeWorkspaceReducer(document)
        ),
        createDefaultWorkspace()
    );
    const handlers = useWorkspaceEditorState(dispatch);
    
    useEffect(() => {
        if (document) {
            const modelMap = document.getMap("model");
            const viewsMap = document.getMap("views");
            const propertiesMap = document.getMap("properties");

            const undoManager = new Y.UndoManager([modelMap, viewsMap, propertiesMap]);
            const workspaceSnapshot = new Workspace(document).toSnapshot();

            dispatch({ type: ActionType.SET_WORKSPACE, payload: { workspace: workspaceSnapshot } });
            setCurrentView(workspaceSnapshot.views.systemLandscape);
            setUndoManager(undoManager);
        }
    }, [document, setCurrentView, setUndoManager, dispatch]);
    
    useOnWorkspaceSync(document, {
        onWorkspaceUpdate: useCallback((workspace: IWorkspaceSnapshot) => {
            // TODO: avoid infinite loop because dispatch is called on reducer with collaborativeMiddleware
            dispatch({ type: ActionType.SET_WORKSPACE, payload: { workspace } });
        }, [dispatch])
    });

    // const { collaboratingUsers } = useWorkspaceRoom();
    // const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    // const { setViewport } = useReactFlow();
    // useOnUserAwarenessChange({ onChange: reportMousePosition });
    // useOnUserViewportChange({ onEnd: reportViewport });
    // useOnUserViewChange({ onChange: reportView });
    // useOnFollowingUserViewportChange({ onChange: setViewport });
    
    // const currentViewUsers = useMemo(() => {
    //     return collaboratingUsers.filter(x => {
    //         return x.view?.type === currentView?.type
    //             && x.view?.identifier === currentView?.identifier;
    //     });
    // }, [collaboratingUsers, currentView?.identifier, currentView?.type]);
    
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
                            <CommentThreadList />
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
                            <StructurizrEditor value={""} />
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
                    <WorkspaceRenderer {...handlers} workspace={workspace} view={currentView}>
                        <WorkspaceViewBreadcrumbs isVisible={isDiagrammingMode} />
                        <WorkspacePresenterInfo isVisible={presentationEnabled} />
                        <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                        <WorkspaceActionsToolbar />
                        <WorkspaceZoomControls />
                    </WorkspaceRenderer>
                </Shell>
            </ShellTabContent>
        </Shell>
    );
}