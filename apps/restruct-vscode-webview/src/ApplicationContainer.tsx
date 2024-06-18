import { Box } from "@chakra-ui/react";
import {
    parseStructurizr,
    structurizrLexer,
    visitWorkspace,
    WorkspaceCstNode
} from "@structurizr/parser";
import { useWorkspace } from "@workspace/core";
import {
    EventName,
    TextEditorEvent,
} from "@restruct/vscode-communication";
import { useSnackbar } from "@restruct/snackbar";
import {
    WorkspaceRenderer,
    WorkspaceViewBreadcrumbs,
    WorkspaceZoomControls,
    useWorkspaceNavigation
} from "@workspace/controls";
import { chain, fold } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    const [ workspaceCst, setWorkspaceCst ] = useState<WorkspaceCstNode>();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    const { snackbar } = useSnackbar();

    useEffect(() => {
        const handleStructurizrChanged = (structurizr: string) => {
            pipe(
                structurizrLexer(structurizr),
                chain(parseStructurizr),
                chain(workspaceCst => {
                    setWorkspaceCst(workspaceCst);
                    return visitWorkspace(workspaceCst);
                }),
                fold(
                    errors => {
                        console.debug("Error while parsing the structurizr", errors);
                    },
                    workspace => {
                        setWorkspace(workspace);
                        setCurrentView(workspace.views.systemLandscape);
                    }
                )
            );
        }

        const eventHandler = (event: MessageEvent<TextEditorEvent>) => {
            try {
                switch (event.data.type) {
                    case EventName.DOCUMENT_CHANGED:
                        handleStructurizrChanged(event.data.structurizr);
                        break;
                }
            }
            catch (error) {
                snackbar({
                    id: "error-handling-message",
                    title: "Error while handling the message",
                    description: error.message,
                    status: "error",
                });
            }
        }

        window.addEventListener("message", eventHandler);

        return () => {
            window.removeEventListener("message", eventHandler);
        }
    }, [setCurrentView, setWorkspace, snackbar]);

    return (
        <Box backgroundColor={"gray.100"} height={"100vh"} width={"100vw"}>
            <WorkspaceRenderer isReadonly workspace={workspace} view={currentView}>
                <WorkspaceViewBreadcrumbs />
                <WorkspaceZoomControls />
            </WorkspaceRenderer>
        </Box>
    )
}