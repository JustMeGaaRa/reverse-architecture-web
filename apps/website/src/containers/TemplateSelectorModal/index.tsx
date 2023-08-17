import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { useWorkspaceStore } from "@reversearchitecture/workspace-viewer";
import { IWorkspace } from "@structurizr/dsl";
import { FC, useCallback, useEffect, useState } from "react";
import {
    TemplateSelector,
    DiagramTemplateGroup
} from "../../components";

type TemplateSelectorModalProps = {
    templates: Array<DiagramTemplateGroup>;
}

export const TemplateSelectorModal: FC<TemplateSelectorModalProps> = ({
    templates,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { workspace } = useWorkspaceStore();
    // const { navigate } = useWorkspaceNavigation();
    const [isInitialized, setIsInitialized] = useState(false);

    const onSelected = useCallback((template) => {
        onClose();

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: JSON.parse(template.payload) as IWorkspace
        }))
    }, [onClose]);

    useEffect(() => {
        if (!isInitialized && workspace) {
            // navigate(workspace.views.systemContexts[0]);
            setIsInitialized(true);
        }
    }, [workspace, isInitialized, setIsInitialized]);

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
