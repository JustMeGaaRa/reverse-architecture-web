import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    HStack,
    IconButton,
    Text
} from "@chakra-ui/react";
import{
    Plus
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { WorkspacePreviewCard } from "./WorkspacePreviewCard";

export const ProjectCard: FC<PropsWithChildren<{
    name: string;
    updated: string;
    files: number;
    members: number;

}>> = ({
    name,
    updated,
    files,
    members
}) => {
    return (
        <Box
            backgroundColor={"gray.100"}
            padding={4}
            borderRadius={24}
            height={"368px"}
            width={"100%"}
        >
            <Flex direction={"column"} gap={8}>
                <Flex gap={4}>
                    <Box
                        borderWidth={1}
                        borderRadius={16}
                        height={16}
                        width={16}
                    />
                    <Flex direction={"column"} flexGrow={1}>
                        <Heading as={"h5"} size={"lg"}>{name}</Heading>
                        <HStack gap={4} color={"gray.700"}>
                            <Text>Updated: {updated}</Text>
                            <Text>Files: {files}</Text>
                            <Text>Members: {members}</Text>
                        </HStack>
                    </Flex>
                    <ButtonGroup size={"lg"}>
                        <Button
                            leftIcon={<Plus />}
                            colorScheme={"yellow"}
                        >
                            New File
                        </Button>
                        <IconButton
                            aria-label={""}
                            colorScheme={"gray"}
                            icon={<Plus />}
                        />
                    </ButtonGroup>
                </Flex>
                <HStack spacing={4}>
                    <WorkspacePreviewCard />
                    <WorkspacePreviewCard />
                    <WorkspacePreviewCard />
                </HStack>
            </Flex>
        </Box>
    )
}