import {
    AspectRatio,
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Step,
    StepIndicator,
    Stepper,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useSteps,
    VStack
} from "@chakra-ui/react";
import {
    NavArrowLeft,
    NavArrowRight,
    Search as SearchIcon
} from "iconoir-react";
import { FC, useState } from "react";
import { WorkspaceInfo } from "../../model";

export const PublishWorkspaceModal: FC<{
    workspaces: WorkspaceInfo[];
    isOpen: boolean;
    onClose: () => void;
    onPublish: (workspace: any) => void;
}> = ({
    workspaces,
    isOpen,
    onClose,
    onPublish
}) => {
    const [ publishWorkspaceId, setPublishWorkspaceId ] = useState("");
    const { activeStep, setActiveStep } = useSteps({ index: 0, count: 3 });
    const steps = [
        { title: "Select the project you want to publish" },
        { title: "Describe your future publication" }
    ]

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
                maxHeight={"800px"}
            >
                <ModalHeader textAlign={"center"}>
                    Publish to Community
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={2}>
                    <Tabs
                        height={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        index={activeStep}
                    >
                        <TabList
                            backgroundColor={"whiteAlpha.50"}
                            borderRadius={16}
                            borderBottom={0}
                            padding={4}
                            marginBottom={2}
                        >
                            <Box flexGrow={1}>
                                <Text fontSize={"12px"} color={"whiteAlpha.700"}>
                                    {`${activeStep + 1}/${steps.length}`}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {steps[activeStep].title}
                                </Text>
                            </Box>
                            <Stepper
                                colorScheme={"yellow"}
                                gap={2}
                                index={activeStep}
                                size={"xs"}
                            >
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepIndicator
                                            height={"4px"}
                                            width={index === activeStep ? "24px" : "6px"}
                                        />
                                    </Step>
                                ))}
                            </Stepper>
                        </TabList>
                        <TabPanels
                            backgroundColor={"whiteAlpha.50"}
                            borderRadius={16}
                            padding={4}
                            height={"100%"}
                        >
                            <TabPanel>
                                <Flex direction={"column"} gap={4}>
                                    <InputGroup variant={"filled"} size={"sm"}>
                                        <InputLeftElement pointerEvents={"none"}>
                                            <SearchIcon />
                                        </InputLeftElement>
                                        <Input
                                            borderRadius={"8px"}
                                            type={"search"}
                                            placeholder={"Search for a project"}
                                        />
                                    </InputGroup>
                                    <FormControl isRequired>
                                        <RadioGroup
                                            value={publishWorkspaceId}
                                            size={"lg"}
                                            onChange={setPublishWorkspaceId}
                                        >
                                            <Stack direction={"column"} height={"100%"} width={"100%"}>
                                                {workspaces.map(workspace => (
                                                    <Flex
                                                        key={workspace.workspaceId}
                                                        backgroundColor={workspace.workspaceId === publishWorkspaceId
                                                            ? "whiteAlpha.100"
                                                            : "none"}
                                                        borderRadius={16}
                                                        color={workspace.workspaceId === publishWorkspaceId
                                                            ? "yellow.900"
                                                            : "whiteAlpha.700"}
                                                        cursor={"pointer"}
                                                        justifyContent={"space-between"}
                                                        padding={3}
                                                        onClick={() => setPublishWorkspaceId(workspace.workspaceId)}
                                                    >
                                                        <Text>{workspace.name}</Text>
                                                        <Radio value={workspace.workspaceId} />
                                                    </Flex>
                                                ))}
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                </Flex>
                            </TabPanel>

                            <TabPanel height={"100%"}>
                                <VStack gap={4} height={"100%"}>
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
                                            src={"https://holori.com/wp-content/uploads/2022/07/AWS-architecture-diagram-software.png"}
                                        />
                                    </AspectRatio>
                                    <FormControl isRequired>
                                        <Input
                                            borderWidth={2}
                                            borderRadius={16}
                                            placeholder={"Enter workspace name"}
                                        />
                                    </FormControl>
                                    <FormControl flexGrow={1}>
                                        <Textarea
                                            borderWidth={2}
                                            borderRadius={16}
                                            height={"100%"}
                                            placeholder={"Enter workspace description"}
                                            resize={"none"}
                                        />
                                    </FormControl>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter padding={4}>
                    <ButtonGroup justifyContent={"space-between"} width={"100%"}>
                        <IconButton
                            aria-label={"previous step"}
                            colorScheme={"gray"}
                            icon={<NavArrowLeft />}
                            title={"previous step"}
                            onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                        />
                        {activeStep < steps.length - 1 && (
                            <Button
                                colorScheme={"yellow"}
                                isDisabled={!publishWorkspaceId}
                                rightIcon={<NavArrowRight />}
                                onClick={() => setActiveStep(Math.min(activeStep + 1, steps.length - 1))}
                            >
                                Continue
                            </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <Button
                                colorScheme={"yellow"}
                                rightIcon={<NavArrowRight />}
                                onClick={() => onPublish?.({})}
                            >
                                Create
                            </Button>
                        )}
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}