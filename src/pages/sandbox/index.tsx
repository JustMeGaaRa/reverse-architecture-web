import { Box, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { FC, useCallback, useEffect } from "react";
import { C4DiagramRenderer, TemplateSelectorModal } from "../../components";
import { ActivityPanel, ToolbarPanel, WorkspacePanel } from "../../components/Panels";
import { useC4Diagram } from "../../components/c4-view-renderer/hooks";
import { templates } from "./Templates";
import { workspaceTemplate } from "./Templates/Workspace";
import { useWorkspace } from "../../dsl";

export const Sandbox: FC = () => {
    const { renderSystemContextView, fromObject } = useC4Diagram();
    const { setWorkspace } = useWorkspace();

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
        const { identifier } = JSON.parse(template.payload);
        renderSystemContextView(identifier);
    }, [onClose, renderSystemContextView]);
    
    useEffect(() => {
        onOpen();
        setWorkspace(workspaceTemplate);
    }, [onOpen, setWorkspace]);

    return (
        <Box height={"100vh"} background={useColorModeValue("", "#1E1E1E")}>
            <C4DiagramRenderer
                onImport={onImport}
            >
                
                <WorkspacePanel />
                <ActivityPanel />
                <ToolbarPanel />

            </C4DiagramRenderer>
                
            <TemplateSelectorModal
                templates={templates}
                isOpen={isOpen}
                onClose={onClose}
                onSelected={onSelected}
            />
        </Box>
    );
};
