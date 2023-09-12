import {
    AspectRatio,
    Button,
    ButtonGroup,
    FormControl,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { FC } from "react";

export const CreateProjectModal: FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreate: (workspace: any) => void;
}> = ({
    isOpen,
    onClose,
    onCreate
}) => {
    return (
        <Modal
            isOpen={isOpen}
            isCentered
            closeOnOverlayClick={false}
            motionPreset={"slideInBottom"}
            onClose={onClose}
        >
            <ModalOverlay
                backgroundColor={"blackAlpha.800"}
                backdropFilter={"blur(8px)"}
                opacity={0.8}
            />
            <ModalContent
                borderRadius={24}
                backgroundColor={"basic.eerie-black"}
                boxShadow={"none"}
                height={"60vh"}
                maxHeight={"600px"}
            >
                <ModalHeader textAlign={"center"}>
                    Create New Project
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={2}>
                    <VStack
                        backgroundColor={"whiteAlpha.50"}
                        borderRadius={16}
                        gap={4}
                        height={"100%"}
                        padding={4}
                    >
                        <AspectRatio
                            borderColor={"whiteAlpha.200"}
                            borderWidth={2}
                            borderRadius={16}
                            overflow={"hidden"}
                            ratio={16 / 9}
                            width={"100%"}
                        >
                            <Image
                                alt={""}
                                height={"100%"}
                                width={"100%"}
                                objectFit={"cover"}
                                src={"https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jpg"}
                            />
                        </AspectRatio>
                        <FormControl isRequired>
                            <Input
                                borderWidth={2}
                                borderRadius={16}
                                placeholder={"Enter project name"}
                            />
                        </FormControl>
                        <FormControl flexGrow={1}>
                            <Textarea
                                borderWidth={2}
                                borderRadius={16}
                                height={"100%"}
                                placeholder={"Enter project description"}
                                resize={"none"}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter padding={4}>
                    <ButtonGroup>
                        <Button colorScheme={"gray"}>
                            Cancel
                        </Button>
                        <Button colorScheme={"yellow"}>
                            Create
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}