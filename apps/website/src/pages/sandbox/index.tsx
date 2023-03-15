import { Box, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { Tag, useWorkspace, Workspace } from "@justmegaara/structurizr-dsl";
import { useReactFlow } from "@reactflow/core";
import { RoomProvider } from "@y-presence/react";
import { FC, useCallback, useEffect, useState } from "react";
import { TemplateSelectorModal } from "../../components";
import { ActivityPanel } from "../../containers/ActivityPanel";
import { ToolbarPanel } from "../../containers/ToolbarPanel";
import { awareness } from "../../containers/UserPresence";
import { WorkspacePanel } from "../../containers/WorkspacePanel";
import { useWorkspaceRenderer, WorkspaceRenderer } from "../../containers/WorkspaceRenderer";
import { createRandomUser } from "../../utils/User";
import { templates } from "./Templates";

export const Sandbox: FC = () => {
    /* handling the import of the file */
    const reactFlow = useReactFlow();
    const toast = useToast();

    // const onImport = useCallback((result) => {
    //     result.match({
    //         ok: (flow) => {
                
    //             reactFlow.setNodes(flow.nodes || []);
    //             reactFlow.setEdges(flow.edges || []);
    //             reactFlow.fitView({ padding: 0.2 });

    //             toast({
    //                 title: "Successfully imported file",
    //                 status: "success",
    //                 position: "bottom-right",
    //                 isClosable: true,
    //                 size: "lg"
    //             });
    //         },
    //         err: () => {
    //             toast({
    //                 title: "Failed to import file",
    //                 position: "bottom-right",
    //                 status: "error",
    //                 isClosable: true
    //             });
    //         }
    //     });
    // }, [reactFlow, toast]);
    
    /* handling the template selection */
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { workspace, setWorkspace } = useWorkspace();
    const { setView } = useWorkspaceRenderer();
    const [isInitialized, setIsInitialized] = useState(false);

    const onSelected = useCallback((template) => {
        onClose();
        setWorkspace(JSON.parse(template.payload) as Workspace);
    }, [onClose, setWorkspace]);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    useEffect(() => {
        if (!isInitialized && workspace) {
            setView(Tag.SoftwareSystem.name, workspace.views.systemContexts[0]);
            setIsInitialized(true);
        }
    }, [workspace, setView, isInitialized, setIsInitialized]);
    
    /* handling the user presence */
    const initialPresence = createRandomUser();

    return (
        <RoomProvider
            awareness={awareness}
            initialPresence={initialPresence}
        >
            <Box
                height={"100vh"}
                background={useColorModeValue("", "#1E1E1E")}
            >

                <WorkspaceRenderer>
                    <WorkspacePanel />
                    <ActivityPanel />
                    <ToolbarPanel />
                </WorkspaceRenderer>
                    
                <TemplateSelectorModal
                    templates={templates}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSelected={onSelected}
                />

            </Box>
        </RoomProvider>
    );
};
