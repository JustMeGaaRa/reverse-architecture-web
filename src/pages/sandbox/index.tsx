import { FC, useCallback, useEffect, useState } from "react";
import { useStore } from "@reactflow/core";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {
    FaSquare,
    FaCircle,
    FaShapes,
    FaUser,
    FaStar
} from "react-icons/fa";
import { saveAs } from "file-saver";
import {
    C4DiagramRenderer,
    TemplateSelectorModal,
    ExportMenu,
    Panel,
    ControlsPanel,
    CollaborationPanel,
    InteractivityPanel,
    AbstractionEditor,
    RelationshipEditor,
    NavigationPanel,
    parseReactFlow,
    DiagramTemplate
} from "../../components";
import { selectedEdgeSelector, selectedNodeSelector } from "../../components/c4-diagram/store";
import { useC4Diagram } from "../../components/c4-diagram/hooks";
import { exportToDrawio, exportToJson } from "../../components/c4-diagram/export";

import Templates from "../../contracts/Templates.json";
import Users from "../../contracts/Users.json"
import Technologies from "../../contracts/Technologies.json";

const SupportedFileTypes = new Set(["application/json"]);

export const Sandbox: FC = () => {
    const { title, setTitle, fromDiagram, fromObject, toObject } = useC4Diagram();
    const selectedNode = useStore(selectedNodeSelector);
    const selectedEdge = useStore(selectedEdgeSelector);
    const noneSelected = selectedNode === undefined && selectedEdge === undefined;

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

        const restoreFromJson = (json: string) => {
            parseReactFlow(json).match({
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
        };

        draggedFiles.forEach(file => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => restoreFromJson(event.target.result as string);
            fileReader.readAsText(file);
        });

        setDraggable({
            isDraggingOver: false,
            isFileTypeSupported: false
        });
    }, [setDraggable, fromObject, toast]);

    const exports = [
        {
            name: "Drawio (*.drawio)",
            export: () => saveAs(exportToDrawio(title, toObject()))
        },
        {
            name: "React Flow (*.json)",
            export: () => saveAs(exportToJson(title, toObject()))
        }
    ];
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSelected = useCallback((template: DiagramTemplate) => {
        onClose();
        const diagram = JSON.parse(template.payload);
        setTitle(diagram.title);
        fromDiagram(diagram, { padding: 0.2 });
    }, [onClose, fromDiagram, setTitle]);
    
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
                    paddingX={4}
                    paddingY={2}
                >
                    <NavigationPanel
                        title={title}
                        onTitleChange={setTitle}
                    >
                        <ExportMenu items={exports} />
                    </NavigationPanel>
                </Panel>
                <Panel
                    dock={"right-center"}
                    padding={4}
                    visibility={noneSelected ? "hidden" : "visible"}
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
                onSelected={onSelected}
            />
        </Box>
    );
};
