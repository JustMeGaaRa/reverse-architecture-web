import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from "@chakra-ui/react";
import { ArrowTrCircle, Heart, UserCircle } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { WorkspacePreview } from "../components";
import { WorkspaceInfo } from "../types";

export const CommunityTemplateCard: FC<PropsWithChildren<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
    onUseTemplateClick?: () => void;
}>> = ({
    workspace,
    onPreviewClick,
    onUseTemplateClick
}) => {
    return (
        <Card
            data-group
            backgroundColor={"transparent"}
            borderRadius={16}
            boxShadow={"none"}
            padding={1}
            _hover={{
                backgroundColor: "whiteAlpha.100",
                cursor: "pointer",
            }}
        >
            <CardHeader padding={1}>
                <Flex>
                    <Avatar
                        colorScheme={"purple"}
                        name={workspace.createdBy}
                        size={"md"}
                        title={workspace.createdBy}
                    />
                    <Flex direction={"column"} px={2}>
                        <Text color={"basic.white"} fontSize={14}>
                            {workspace.name}
                        </Text>
                        <Text color={"whiteAlpha.700"} fontSize={12}>
                            {workspace.createdBy}
                        </Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody px={0} py={1}>
                <WorkspacePreview
                    workspace={workspace}
                    onPreviewClick={onPreviewClick}
                />
            </CardBody>
            <CardFooter
                padding={1}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <HStack color={"whiteAlpha.700"} spacing={1}>
                    <Tag height={"32px"} size={"lg"} variant={"unstyled"} title={"788 used"}>
                        <TagLeftIcon as={UserCircle} />
                        <TagLabel>788 used</TagLabel>
                    </Tag>
                    <Tag height={"32px"} size={"lg"} variant={"unstyled"} title={"47 liked"}>
                        <TagLeftIcon as={Heart} />
                        <TagLabel>47 liked</TagLabel>
                    </Tag>
                </HStack>
                <Button
                    colorScheme={"gray"}
                    leftIcon={<ArrowTrCircle />}
                    pr={4}
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => onUseTemplateClick?.()}
                >
                    Use
                </Button>
            </CardFooter>
        </Card>
    )
}

