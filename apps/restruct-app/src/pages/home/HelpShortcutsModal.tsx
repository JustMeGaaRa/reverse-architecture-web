import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react";

export const HelpShortcutsModal: FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({
    isOpen,
    onClose
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    Shortcuts Table
                </ModalHeader>
                <ModalBody>
                    
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}