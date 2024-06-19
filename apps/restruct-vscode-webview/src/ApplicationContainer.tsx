import { Box } from "@chakra-ui/react";
import { WorkspaceCstNode } from "@structurizr/parser";
import {
    EventName,
    IObserver,
    TextEditorEvent,
} from "@restruct/vscode-communication";
import { useWorkspace } from "@workspace/core";
import {
    WorkspaceRenderer,
    WorkspaceViewBreadcrumbs,
    WorkspaceZoomControls,
    useWorkspaceNavigation
} from "@workspace/controls";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useRef,
    useState
} from "react";
import { ExtensionEventObserver } from "./ExtensionEventObserver";

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    const eventObserver = useRef<IObserver<TextEditorEvent>>();
    const [ workspaceCst, setWorkspaceCst ] = useState<WorkspaceCstNode>();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setCurrentView } = useWorkspaceNavigation();

    useEffect(() => {
        eventObserver.current = new ExtensionEventObserver();
        const disposable = eventObserver.current.subscribe({
            onNext: event => {
                if (event.type === EventName.EDITOR_WORKSPACE_CHANGED) {
                    setWorkspace(event.workspace);
                    setCurrentView(event.workspace.views.systemLandscape);
                }
            },
            onError: error => {
                console.debug("Error while parsing the structurizr", error);
            }
        });

        return () => {
            disposable.dispose();
        }
    }, [setCurrentView, setWorkspace]);

    return (
        <Box backgroundColor={"gray.100"} height={"100vh"} width={"100vw"}>
            <WorkspaceRenderer isReadonly workspace={workspace} view={currentView}>
                <WorkspaceViewBreadcrumbs />
                <WorkspaceZoomControls />
            </WorkspaceRenderer>
        </Box>
    )
}