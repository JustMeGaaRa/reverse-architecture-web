import { FC } from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {
    TemplateSelector,
    IDiagramTemplate,
    IDiagramTemplateGroup
} from "./TemplateSelector";

type TemplateSelectorModalProps = {
    templates: Array<IDiagramTemplateGroup>;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: IDiagramTemplate) => void;
}

export const TemplateSelectorModal: FC<TemplateSelectorModalProps> = ({
    templates,
    isOpen,
    onClose,
    onSelect,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            isCentered
            size={["sm", "xl", "2xl"]}
            onClose={onClose}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            scrollBehavior={"inside"}
        >
            <ModalOverlay
                backdropFilter={"auto"}
                backdropBlur={"2px"}
            />
            <ModalContent>
                <ModalHeader>Select Diagram Template</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TemplateSelector
                        templates={templates}
                        onSelect={onSelect}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
