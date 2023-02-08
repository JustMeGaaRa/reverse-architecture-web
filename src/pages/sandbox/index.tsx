import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { FC, useCallback, useEffect } from "react";
import { C4DiagramRenderer, TemplateSelectorModal } from "../../components";
import { useC4Diagram } from "../../components/c4-view-renderer/hooks";
import { templates } from "../../contracts/Templates";


export const Sandbox: FC = () => {
    const { fromDiagram, fromObject } = useC4Diagram();

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
        fromDiagram(JSON.parse(template.payload), { padding: 0.2 });
    }, [onClose, fromDiagram]);
    
    useEffect(() => onOpen(), [onOpen]);

    return (
        <Box height={"100vh"}>
            <C4DiagramRenderer
                onImport={onImport}
            />
                
            <TemplateSelectorModal
                templates={templates}
                isOpen={isOpen}
                onClose={onClose}
                onSelected={onSelected}
            />
        </Box>
    );
};
