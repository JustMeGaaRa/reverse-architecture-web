import { FC, useCallback, useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import {
    Box,
    useDisclosure
} from "@chakra-ui/react";
import { C4DiagramRenderer, Diagram, IDiagramTemplate, TemplateSelectorModal } from "../../components";
import { NavigationPanel } from "../../components/panels/NavigationPanel";
import { CollaborationPanel } from "../../components/panels/CollaborationPanel";
import { Templates } from "./Templates";

import Users from "../../contracts/Users.json"
import ContainerDiagram from "../../contracts/ContainerDiagram.json";
import Technologies from "../../contracts/Technologies.json";

export const Sandbox: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [diagram, setDiagram] = useState<Diagram>(ContainerDiagram);

    const onSelect = useCallback((template: IDiagramTemplate) => {
        setDiagram(template.payload
            ? JSON.parse(template.payload)
            : ContainerDiagram);
        onClose();
    }, [setDiagram, onClose]);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <ReactFlowProvider>
            <Box height="100vh">
                <C4DiagramRenderer
                    diagram={diagram}
                    technologies={Technologies}
                />
                <NavigationPanel diagram={diagram} />
                <CollaborationPanel users={Users} />
                <TemplateSelectorModal
                    templates={Templates}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSelect={onSelect}
                />
            </Box>
        </ReactFlowProvider>
    );
};
