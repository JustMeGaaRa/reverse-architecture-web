import { Box } from "@chakra-ui/react";
import { useWorkspaceNavigation } from "@restruct/workspace-renderer";
import { parseStructurizr, structurizrLexer, visitWorkspace } from "@structurizr/parser";
import { useWorkspace } from "@structurizr/react";
import { chain, fold } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { FC, PropsWithChildren, useEffect, useState } from "react";

type Message = {
    command: "update";
    content?: string;
}

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspaceCst ] = useState<any>();
    const { setWorkspace } = useWorkspace();
    const { setCurrentView } = useWorkspaceNavigation();

    useEffect(() => {
        const eventHandler = (event: MessageEvent<Message>) => {
            try {
                switch (event.data.command) {
                    case "update":
                        pipe(
                            structurizrLexer(event.data.content),
                            chain(tokens => {
                                console.debug("Structurizr Preview: received update message");
                                return parseStructurizr(tokens);
                            }),
                            chain(workspaceCst => {
                                console.debug("Structurizr Preview: parsed structurizr successfully");
                                setWorkspaceCst(workspaceCst);
                                return visitWorkspace(workspaceCst);
                            }),
                            fold(
                                errors => {
                                    console.error("Structurizr Preview: error while parsing structurizr", errors);
                                },
                                workspace => {
                                    console.debug("Structurizr Preview: parsing workspace successfully")
                                    setWorkspace(workspace);
                                    setCurrentView(workspace.views.systemLandscape);
                                }
                            )
                        );
                        break;
                }
            }
            catch (error) {
                console.error("Structurizr Preview: error while handling message", error);
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