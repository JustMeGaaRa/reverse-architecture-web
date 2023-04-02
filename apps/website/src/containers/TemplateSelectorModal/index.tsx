import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { Tag, useWorkspace, Workspace } from "@justmegaara/structurizr-dsl";
import { FC, useCallback, useEffect, useState } from "react";
import {
    TemplateSelector,
    DiagramTemplateGroup
} from "../../components";
import { useWorkspaceRenderer } from "..";

type TemplateSelectorModalProps = {
    templates: Array<DiagramTemplateGroup>;
}

export const TemplateSelectorModal: FC<TemplateSelectorModalProps> = ({
    templates,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { workspace, setWorkspace } = useWorkspace();
    const { setView } = useWorkspaceRenderer();
    const [isInitialized, setIsInitialized] = useState(false);

    const onSelected = useCallback((template) => {
        onClose();
        setWorkspace(JSON.parse(template.payload) as Workspace);
    }, [onClose, setWorkspace]);

    useEffect(() => {
        if (!isInitialized && workspace) {
            setView(Tag.SoftwareSystem.name, workspace.views.systemContexts[0]);
            setIsInitialized(true);
        }
    }, [workspace, setView, isInitialized, setIsInitialized]);

    useEffect(() => onOpen(), [onOpen]);

    return (
        <Modal
            isOpen={isOpen}
            isCentered
            size={["xl", "2xl", "4xl"]}
            onClose={onClose}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select Workspace Template</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TemplateSelector
                        templates={templates}
                        onSelected={onSelected}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
