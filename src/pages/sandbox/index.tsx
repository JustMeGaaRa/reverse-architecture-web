import { FC } from "react";
import { ReactFlowProvider } from "reactflow";
import {
    Box,
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    useDisclosure
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { C4Diagram } from "../../components";

import ContainerDiagram from "../../contracts/ContainerDiagramClassic.json";
import Technologies from "../../contracts/Technologies.json";

export const Sandbox: FC = () => {
    const { isOpen, onClose } = useDisclosure({ isOpen: false });

    return (
        <ReactFlowProvider>
            <Box height="100vh">
                <C4Diagram
                    diagram={ContainerDiagram}
                    technologies={Technologies}
                />
            </Box>
            <Modal
                isOpen={isOpen}
                isCentered
                onClose={onClose}
            >
                <ModalOverlay
                    backdropFilter={"auto"}
                    backdropBlur={"2px"}
                />
                <ModalContent>
                    <ModalHeader>Select Diagram</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid>
                            <Box>System Context</Box>
                            <Box>Container</Box>
                            <Box>Component</Box>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter justifyContent={"center"}>
                        <ButtonGroup>
                            <Button
                                leftIcon={<FaCheck />}
                                colorScheme={"blue"}
                                onClick={onClose}
                            >
                                Okay
                            </Button>
                            <Button
                                variant={"ghost"}
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ReactFlowProvider>
    );
};
