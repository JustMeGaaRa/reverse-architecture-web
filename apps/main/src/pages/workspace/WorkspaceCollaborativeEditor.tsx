import { Divider } from "@chakra-ui/react";
import { StructurizrEditor } from "@monaco-editor/structurizr";
import {
    Shell,
    ShellBody,
    ShellCloseButton,
    ShellHeader,
    ShellPanel,
    ShellTabContent,
    ShellTitle
} from "@restruct/ui";
import { parseStructurizr } from "@structurizr/parser";
import { useWorkspace } from "@structurizr/react";
import { Workspace } from "@structurizr/y-workspace";
import {
    CollaboratingUserPane,
    usePresentationMode,
    useUserAwareness,
    useWorkspaceRoom
} from "@workspace/live";
import { useYjsCollaborative } from "@yjs/react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import * as Y from "yjs";
import {
    CommentThreadList,
    PresenterInfoBar,
    useWorkspaceNavigation,
    WorkspaceActionsToolbar,
    WorkspaceEditor,
    WorkspaceRenderer,
    WorkspaceUndoRedoControls,
    WorkspaceViewBreadcrumbs,
    WorkspaceZoomControls
} from "../../features";

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
    const { document, setUndoManager } = useYjsCollaborative();
    const { collaboratingUsers } = useWorkspaceRoom();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    const { setWorkspace } = useWorkspace();
    const [ yworkspace, setYWorkspace ] = useState<Workspace>();
    const [ structurizrCode, setStructurizrCode ] = useState("");

    const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    const { presentationEnabled, presenterInfo } = usePresentationMode();

    // const { setViewport } = useReactFlow();
    
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
            setYWorkspace(workspace);
            setCurrentView(workspaceSnapshot.views.systemLandscape);
        }
    }, [document, setCurrentView, setUndoManager, setWorkspace, setYWorkspace]);

    // useOnUserAwarenessChange({ onChange: reportMousePosition });
    // useOnUserViewportChange({ onEnd: reportViewport });
    // useOnUserViewChange({ onChange: reportView });
    // useOnFollowingUserViewportChange({ onChange: setViewport });
    
    const currentViewUsers = useMemo(() => {
        return collaboratingUsers.filter(x => {
            return x.view?.type === currentView?.type
                && x.view?.identifier === currentView?.identifier;
        });
    }, [collaboratingUsers, currentView?.identifier, currentView?.type]);
    
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

    // SECTION: code editor panel
    const handleOnChangeStructurizrCode = useCallback((value: string) => {
        setStructurizrCode(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        // TODO: handle parsing errors
        // setWorkspace(parseStructurizr(value));
    }, [setYWorkspace]);

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
                            <StructurizrEditor
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
                    {/* TODO: use the editable version of the workspace renderer */}
                    <WorkspaceEditor workspace={yworkspace} view={currentView} discussions={[]}>
                        <CollaboratingUserPane users={currentViewUsers} />
                        <PresenterInfoBar presenter={presenterInfo} />
                        <WorkspaceViewBreadcrumbs isVisible={isDiagrammingMode} />
                        <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                        <WorkspaceActionsToolbar />
                        <WorkspaceZoomControls />
                        {children}
                    </WorkspaceEditor>
                </Shell>
            </ShellTabContent>
        </Shell>
    );
}