import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorModeValue
} from "@chakra-ui/react";
import { FC } from "react";
import {
    TemplateSelector,
    DiagramTemplate,
    DiagramTemplateGroup
} from "./TemplateSelector";

type TemplateSelectorModalProps = {
    templates: Array<DiagramTemplateGroup>;
    isOpen: boolean;
    onClose: () => void;
    onSelected: (template: DiagramTemplate) => void;
}

export const TemplateSelectorModal: FC<TemplateSelectorModalProps> = ({
    templates,
    isOpen,
    onClose,
    onSelected,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            isCentered
            size={["xl", "2xl", "4xl"]}
            onClose={onClose}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay
                backdropFilter={"auto"}
                backdropBlur={"2px"}
            />
            <ModalContent
                background={useColorModeValue("whiteAlpha.900", "rgba(31, 33, 35, 0.9)")}
                borderColor={useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.1)")}
            >
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
