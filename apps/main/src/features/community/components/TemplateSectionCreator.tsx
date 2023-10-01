import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { AddUser } from "iconoir-react";
import { FC } from "react";
import { InformationHeader, WorkspaceInfo } from "../..";

export const TemplateSectionCreator: FC<{
    information: WorkspaceInfo;
    onFollowClick?: () => void;
}> = ({
    information,
    onFollowClick
}) => {
    return (
        <Box padding={4} width={"100%"}>
            <InformationHeader
                image={(
                    <Avatar
                        colorScheme={"purple"}
                        name={information?.createdBy}
                    />
                )}
                title={(
                    <Text color={"basic.white"} fontSize={"16px"}>
                        {information?.createdBy}
                    </Text>
                )}
                subtitle={(
                    <Text color={"gray.700"} fontSize={"12px"}>
                        {information?.createdBy}
                    </Text>
                )}
                action={(
                    <Flex height={"100%"} alignItems={"center"} justifyContent={"center"}>
                        <Button
                            colorScheme={"gray"}
                            leftIcon={<AddUser />}
                            padding={2}
                            size={"sm"}
                            title={"follow"}
                            variant={"solid"}
                            onClick={onFollowClick}
                        >
                            Follow
                        </Button>
                    </Flex>
                )}
            />
        </Box>
    )
}