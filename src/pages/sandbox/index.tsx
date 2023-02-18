import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { FC, useCallback, useEffect } from "react";
import { C4DiagramRenderer, TemplateSelectorModal } from "../../components";
import { CollaborationPanel, InteractivityPanel, NavigationPanel } from "../../components/Panels";
import { useC4Diagram } from "../../components/c4-view-renderer/hooks";
import { templates } from "./Templates";
import { workspaceTemplate } from "./Templates/Workspace";
import { useWorkspace } from "../../dsl";

export const Sandbox: FC = () => {
    const {
        renderSystemContextView,
        renderContainerView,
        renderComponentView,
        renderDeploymentView,
        fromObject
    } = useC4Diagram();
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

        const { type, identifier, environment } = JSON.parse(template.payload);

        switch (type) {
            case "Software Context":
                renderSystemContextView(identifier);
                break;
            case "Container":
                renderContainerView(identifier);
                break;
            case "Component":
                renderComponentView(identifier);
                break;
            case "Deployment":
                renderDeploymentView(identifier, environment);
                break;
        }
    }, [
        onClose,
        renderSystemContextView,
        renderContainerView,
        renderComponentView,
        renderDeploymentView
    ]);
    
    useEffect(() => {
        onOpen();
        setWorkspace(workspaceTemplate);
    }, [onOpen, setWorkspace]);

    return (
        <Box height={"100vh"}>
            <C4DiagramRenderer
                onImport={onImport}
            >
                
                <CollaborationPanel />
                <InteractivityPanel />
                <NavigationPanel />

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
