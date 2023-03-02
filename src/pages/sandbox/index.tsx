import { Box, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { RoomProvider } from "@y-presence/react";
import { FC, useCallback, useEffect, useState } from "react";
import {
    ActivityPanel,
    ToolbarPanel,
    WorkspacePanel,
    WorkspaceRenderer,
    createAnonymousUser,
    TemplateSelectorModal,
    awareness
} from "../../components";
import { useWorkspaceRenderer } from "../../components";
import { templates } from "./Templates";
import { useWorkspace, Workspace } from "../../dsl";

export const Sandbox: FC = () => {
    const { workspace, setWorkspace } = useWorkspace();
    const { renderSystemContextView, fromObject } = useWorkspaceRenderer();
    const [isInitialized, setIsInitialized] = useState(false);

    const toast = useToast();
    const onImport = useCallback((result) => {
        result.match({
            ok: (flow) => {
                fromObject(flow, { padding: 0.2 });
                toast({
                    title: "Successfully imported file",
                    status: "success",
                    position: "bottom-right",
                    isClosable: true,
                    size: "lg"
                });
            },
            err: () => {
                toast({
                    title: "Failed to import file",
                    position: "bottom-right",
                    status: "error",
                    isClosable: true
                });
            }
        });
    }, [fromObject, toast]);
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSelected = useCallback((template) => {
        onClose();
        setWorkspace(JSON.parse(template.payload) as Workspace);
    }, [onClose, setWorkspace]);
    
    const initialPresence = createAnonymousUser();

    useEffect(() => {
        if (!isInitialized && workspace) {
            const identifier = workspace.views.systemContexts[0].softwareSystemIdentifier;
            renderSystemContextView(identifier);
            setIsInitialized(true);
        }
    }, [workspace, renderSystemContextView, isInitialized, setIsInitialized]);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <RoomProvider awareness={awareness} initialPresence={initialPresence}>
            <Box height={"100vh"} background={useColorModeValue("", "#1E1E1E")}>
                <WorkspaceRenderer
                    // workspace={workspace}
                    // view={view}
                    onImport={onImport}
                >
                    
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
