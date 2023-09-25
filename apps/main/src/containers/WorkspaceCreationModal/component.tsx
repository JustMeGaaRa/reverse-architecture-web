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
import { Workspace } from "@structurizr/dsl";
import { useFormik } from "formik";
import { FC } from "react";
import { v4 } from "uuid";
import { useAccount, WorkspaceInfo } from "../../features";

export const WorkspaceCreationModal: FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreate: (workspace: WorkspaceInfo) => void;
}> = ({
    isOpen,
    onClose,
    onCreate
}) => {
    const { account } = useAccount();
    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit
    } = useFormik<WorkspaceInfo>({
        initialValues: {
            workspaceId: v4(),
            name: "",
            tags: [],
            text: JSON.stringify(Workspace.Empty.toObject()),
            updatedBy: account.email,
            updated: new Date()
        },
        onSubmit: (values, actions) => {
            onCreate(values);
            actions.setSubmitting(false);
            onClose();
        }
    });

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
            <form onSubmit={handleSubmit}>
                <ModalContent
                    borderRadius={24}
                    backgroundColor={"basic.eerie-black"}
                    boxShadow={"none"}
                    height={"600px"}
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
                                    name={"name"}
                                    borderWidth={2}
                                    borderRadius={16}
                                    placeholder={"Enter project name"}
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl flexGrow={1}>
                                <Textarea
                                    name={"description"}
                                    borderWidth={2}
                                    borderRadius={16}
                                    height={"100%"}
                                    placeholder={"Enter project description"}
                                    resize={"none"}
                                    value={values.description}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter padding={4}>
                        <ButtonGroup justifyContent={"right"} width={"100%"}>
                            <Button
                                colorScheme={"yellow"}
                                isLoading={isSubmitting}
                                type={"submit"}
                            >
                                Create
                            </Button>
                            <Button colorScheme={"gray"}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}