import { FC } from "react";
import {
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import { TemplateSelector, IDiagramTemplate } from "./TemplateSelector";

type TemplateSelectorModalProps = {
    templates: Array<IDiagramTemplate>;
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
        >
            <ModalOverlay
                backdropFilter={"auto"}
                backdropBlur={"2px"}
            />
            <ModalContent>
                <ModalHeader>Select Diagram Template</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Heading as={"h2"} fontSize={["sm"]} pb={4}>
                        C4 Blank Templates
                    </Heading>
                    <TemplateSelector
                        templates={templates}
                        onSelect={onSelect}
                    />
                </ModalBody>
                <ModalFooter justifyContent={"center"}>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
