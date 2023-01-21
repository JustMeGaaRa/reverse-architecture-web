import { FC, useCallback, useEffect, useState } from "react";
import { ReactFlowJsonObject, useReactFlow, useStore } from "reactflow";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import {
    C4DiagramRenderer,
    TemplateSelectorModal,
    Panel,
    ControlsPanel,
    CollaborationPanel,
    InteractivityPanel,
    AbstractionEditor,
    RelationshipEditor,
    NavigationPanel,
    getDiagramNodes,
    getDiagramEdges,
    parseReactFlow,
} from "../../components";
import type { DiagramTemplate } from "../../components";
import {
    exportToDrawio,
    exportToJson,
    exportToImage
} from "../../components/c4-diagram/export";
import { selectedEdgeSelector, selectedNodeSelector } from "../../components/c4-diagram/store";

import Templates from "../../contracts/Templates.json";
import Users from "../../contracts/Users.json"
import Technologies from "../../contracts/Technologies.json";

const SupportedFileTypes = new Set(["application/json"]);

export const Sandbox: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setNodes, setEdges, toObject, setViewport } = useReactFlow();
    const selectedNode = useStore(selectedNodeSelector);
    const selectedEdge = useStore(selectedEdgeSelector);
    const anySelected = selectedNode !== undefined || selectedEdge !== undefined;
    
    const [title, setTitle] = useState("Diagram");

    const onSelect = useCallback((template: DiagramTemplate) => {
        const diagram = JSON.parse(template.payload);
        onClose();
        setNodes(getDiagramNodes(diagram));
        setEdges(getDiagramEdges(diagram));
        setTitle(diagram.title);
    }, [onClose, setNodes, setEdges]);

    const onTitleChanged = useCallback(setTitle, [setTitle]);

    const onExportDrawio = useCallback(() => saveAs(exportToDrawio(title, toObject())), [title, toObject]);
    const onExportJson = useCallback(() => saveAs(exportToJson(title, toObject())), [title, toObject]);
    const onExportImage = useCallback(async () => saveAs(await exportToImage(title, toObject())), [title, toObject]);

    const toast = useToast();
    const [, setDraggable] = useState({
        isDraggingOver: false,
        isFileTypeSupported: false
    });

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {        
        const dragSupportedFileType = Array
            .from(event.dataTransfer.items)
            .filter(item => item.type === "file")
            .some(file => SupportedFileTypes.has(file.type));
        
        setDraggable({
            isDraggingOver: true,
            isFileTypeSupported: dragSupportedFileType
        });
    }, [setDraggable]);
    const onDragEnd = useCallback(() => {
        setDraggable({
            isDraggingOver: false,
            isFileTypeSupported: false
        });
    }, [setDraggable]);
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const draggedFiles = Array
            .from(event.dataTransfer.files)
            .filter(file => SupportedFileTypes.has(file.type));

        const restoreFlow = (flow: ReactFlowJsonObject) => {
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            setViewport(flow.viewport);
        }

        draggedFiles.forEach(file => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                parseReactFlow(event.target.result as string)
                    .match({
                        ok: (flow) => {
                            restoreFlow(flow);
                            toast({
                                title: "Successfully imported file",
                                status: "success",
                                position: "bottom-right",
                                isClosable: true,
                                size: "lg"
                            });
                        },
                        err: (error) => {
                            toast({
                                title: "Failed to import file",
                                description: error.message,
                                position: "bottom-right",
                                status: "error",
                                isClosable: true
                            });
                        }
                    });
            }
            fileReader.readAsText(file);
        });

        setDraggable({
            isDraggingOver: false,
            isFileTypeSupported: false
        });
    }, [setDraggable, setNodes, setEdges, setViewport, toast]);
    
    useEffect(() => onOpen(), [onOpen]);

    return (
        <Box
            height="100vh"
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
        >
            <C4DiagramRenderer>
                <CollaborationPanel users={Users} />
                <ControlsPanel />
                <InteractivityPanel />
                <Panel
                    dock={"top-left"}
                    px={4}
                    py={2}
                >
                    <NavigationPanel
                        title={title}
                        exporters={{
                            onExportDrawio,
                            onExportJson,
                            onExportImage
                        }}
                        onTitleChange={onTitleChanged}
                    />
                </Panel>
                <Panel
                    dock={"right-center"}
                    padding={4}
                    visibility={anySelected ? "visible" : "hidden"}
                    zIndex={9}
                >
                    <AbstractionEditor
                        data={selectedNode?.data}
                        technologies={Technologies}
                    />
                    <RelationshipEditor
                        data={selectedEdge?.data}
                        technologies={Technologies}
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
    );
};
