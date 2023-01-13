import { FC, useCallback, useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import {
    Box,
    useDisclosure
} from "@chakra-ui/react";
import {
    C4DiagramRenderer,
    Diagram,
    IDiagramTemplate,
    TemplateSelectorModal
} from "../../components";
import { Panel } from "../../components/panels/Panel";
import { NavigationPanel } from "../../components/panels/NavigationPanel";
import { exportToDrawio } from "../../components/c4-diagram/export/DrawioExporter";
import { exportToJson } from "../../components/c4-diagram/export/JsonExporter";
import { exportToImage } from "../../components/c4-diagram/export/ImageExporter";
import { Templates } from "./Templates";

import Users from "../../contracts/Users.json"
import ContainerDiagram from "../../contracts/ContainerDiagram.json";
import Technologies from "../../contracts/Technologies.json";
import FileSaver from "file-saver";

export const Sandbox: FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [diagram, setDiagram] = useState<Diagram>(ContainerDiagram);

    const onSelect = useCallback((template: IDiagramTemplate) => {
        onClose();
        setDiagram(template.payload
            ? JSON.parse(template.payload)
            : ContainerDiagram);
    }, [setDiagram, onClose]);

    const onTitleChanged = useCallback((title) => {
        setDiagram({
            ...diagram,
            title
        });
    }, [setDiagram, diagram]);

    const onExportDrawio = useCallback(() => {
        FileSaver.saveAs(new File(
            [exportToDrawio(diagram)],
            `${diagram.title}.drawio`
        ));
    }, [diagram]);
    const onExportJson = useCallback(() => {
        FileSaver.saveAs(new File(
            [exportToJson(diagram)],
            `${diagram.title}.json`
        ));
    }, [diagram]);
    const onExportImage = useCallback(() => {
        FileSaver.saveAs(new File(
            [exportToImage(undefined)],
            `${diagram.title}.png`
        ));
    }, [diagram]);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <ReactFlowProvider>
            <Box height="100vh">
                <C4DiagramRenderer
                    diagram={diagram}
                    technologies={Technologies}
                    users={Users}
                >
                    <Panel dock={"top-left"} px={4} py={2}>
                        <NavigationPanel
                            diagram={diagram}
                            exporters={{
                                onExportDrawio,
                                onExportJson,
                                onExportImage
                            }}
                            onTitleChange={onTitleChanged}
                        />
                    </Panel>
                </C4DiagramRenderer>
                    
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
