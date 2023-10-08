import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    Highlight,
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
    Text,
    VStack,
} from "@chakra-ui/react";
import { NavArrowRight } from "iconoir-react";
import { FC, useState } from "react";
import { useAccount } from "../../features";

export const RepositorySelectModal: FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({
    isOpen,
    onClose
}) => {
    const { account } = useAccount();
    const [ selectedRepositoryId, setSelectedRepositoryId ] = useState("");
    const repositories = [
        {
            repositoryId: "1",
            name: "Online Banking App",
        },
        {
            repositoryId: "2",
            name: "Amazon Web Services"
        }
    ]

    return (
        <Modal
            isOpen={isOpen}
            isCentered
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
                height={"700px"}
            >
                <ModalHeader textAlign={"center"}>
                    Select Repository
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={2}>
                    <Flex direction={"column"} gap={2} height={"100%"}>
                        <Box
                            backgroundColor={"whiteAlpha.50"}
                            borderRadius={16}
                            padding={4}
                            flexGrow={0}
                            width={"100%"}
                        >
                            <Text
                                color={"basic.white"}
                                fontSize={"24px"}
                            >
                                <Highlight
                                    query={account.fullname}
                                    styles={{ color: "yellow.900" }}
                                >
                                    {`Welcome ${account.fullname}`}
                                </Highlight>
                            </Text>
                            <Text fontSize={"16px"} color={"whiteAlpha.700"}>
                                Let’s make a quick and easy start via GitHub integration. All projects from your repository will be synchronised.
                            </Text>
                        </Box>
                        <Box
                            backgroundColor={"whiteAlpha.50"}
                            borderRadius={16}
                            flexGrow={1}
                            padding={4}
                            width={"100%"}
                        >
                            <VStack gap={4} width={"100%"}>
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
                                        value={selectedRepositoryId}
                                        size={"lg"}
                                        onChange={setSelectedRepositoryId}
                                    >
                                        <Stack direction={"column"} height={"100%"} width={"100%"}>
                                            {repositories.map(repository => (
                                                <Flex
                                                    key={repository.repositoryId}
                                                    backgroundColor={repository.repositoryId === selectedRepositoryId
                                                        ? "whiteAlpha.100"
                                                        : "none"}
                                                    borderRadius={16}
                                                    color={repository.repositoryId === selectedRepositoryId
                                                        ? "yellow.900"
                                                        : "whiteAlpha.700"}
                                                    cursor={"pointer"}
                                                    justifyContent={"space-between"}
                                                    padding={3}
                                                    onClick={() => setSelectedRepositoryId(repository.repositoryId)}
                                                >
                                                    <Text>{repository.name}</Text>
                                                    <Radio value={repository.repositoryId} />
                                                </Flex>
                                            ))}
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </VStack>
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter padding={4}>
                    <ButtonGroup justifyContent={"right"} width={"100%"}>
                        <Button
                            colorScheme={"yellow"}
                            rightIcon={<NavArrowRight />}
                            onClick={() => {}}
                        >
                            {`Let's get started`}
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}