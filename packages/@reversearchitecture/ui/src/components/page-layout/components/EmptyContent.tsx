import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { EmojiSad, Folder } from "iconoir-react";
import { FC } from "react";

export const StateMessage: FC<{
    icon: any;
    title: string;
    description: string;
    action?: React.ReactElement;
}> = ({
    icon,
    title,
    description,
    action
}) => {
    return (
        <Flex
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
        >
            <Flex
                alignItems={"center"}
                direction={"column"}
                textAlign={"center"}
                maxWidth={500}
                position={"relative"}
                top={"20vh"}
            >
                <Icon
                    as={icon}
                    boxSize={"72px"}
                    strokeWidth={.4}
                    mb={4}
                />
                <Text
                    fontSize={20}
                    color={"white"}
                >
                    {title}
                </Text>
                <Text
                    fontSize={16}
                    color={"gray.700"}
                >
                    {description}
                </Text>
                <Box
                    mt={4}
                >
                    {action}
                </Box>
            </Flex>
        </Flex>
    );
}

export const LoadingMessage: FC<{
    title: string;
    description: string;
    action?: React.ReactElement;
}> = ({
    title: loadingTitle,
    description: loadingDescription,
    action
}) => {
    return (
        <Flex
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
        >
            <Flex
                alignItems={"center"}
                direction={"column"}
                textAlign={"center"}
                maxWidth={500}
                position={"relative"}
                top={"20vh"}
            >

                <Spinner size={"xl"} mb={4} />
                <Text
                    fontSize={20}
                    color={"white"}
                >
                    {loadingTitle}
                </Text>
                <Text
                    fontSize={16}
                    color={"gray.700"}
                >
                    {loadingDescription}
                </Text>
                <Box mt={4}>
                    {action}
                </Box>
            </Flex>
        </Flex>
    )
}