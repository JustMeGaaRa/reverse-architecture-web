import { Box } from "@chakra-ui/react";
import { useWorkspaceNavigation, WorkspaceRenderer } from "@restruct/workspace-renderer";
import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { parseStructurizr } from "@structurizr/parser";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useEffect } from "react";

// import "@reactflow/core/dist/style.css";
// import '@reactflow/node-resizer/dist/style.css';

type Message = {
    command: "update";
    content?: string;
}

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    const { setWorkspace } = useWorkspace();
    const { setCurrentView } = useWorkspaceNavigation();

    useEffect(() => {
        const tryParseWorkspace = (structurizr: string): [boolean, IWorkspaceSnapshot] => {
            let successfull = false;
            let workspace: IWorkspaceSnapshot;

            try {
                workspace = parseStructurizr(structurizr);
                successfull = true;
            } catch (error) {
                workspace = undefined;
                successfull = false;
            }

            return [successfull, workspace];
        }

        const eventHandler = (event: MessageEvent<Message>) => {
            switch (event.data.command) {
                case "update":
                    console.log("Received update message");
                    const [successfull, workspace] = tryParseWorkspace(event.data.content);

                    if (successfull) {
                        console.log("Parsed workspace", workspace);
                        setWorkspace(workspace);
                        setCurrentView(workspace.views.systemLandscape);
                    }
                    break;
            }
        }

        window.addEventListener("message", eventHandler);

        return () => {
            window.removeEventListener("message", eventHandler);
        }
    }, [setCurrentView, setWorkspace]);

    return (
        <Box backgroundColor={"gray.100"} height={"100vh"} width={"100vw"}>
            {children}
        </Box>
    )
}