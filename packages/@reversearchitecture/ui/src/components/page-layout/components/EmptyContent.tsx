import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { CloudDownload, EmojiSad, Folder } from "iconoir-react";
import { FC } from "react";

export const MessageContent: FC<{
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
                <Icon as={icon} boxSize={"72px"} strokeWidth={.4} mb={4} />
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

export const ErrorMessage: FC<{
    errorTitle: string
    errorDescription: string;
    action?: React.ReactElement;
}> = ({
    errorTitle,
    errorDescription,
    action
}) => {
    return (
        <MessageContent
            icon={EmojiSad}
            title={errorTitle}
            description={errorDescription}
            action={action}
        />
    )
}

export const NoContentMessage: FC<{
    actionTitle: string;
    actionDescription: string;
    action?: React.ReactElement;
}> = ({
    actionTitle,
    actionDescription,
    action
}) => {
    return (
        <MessageContent
            icon={Folder}
            title={actionTitle}
            description={actionDescription}
            action={action}
        />
    )
}

export const LoadingMessage: FC<{
    loadingTitle: string;
    loadingDescription: string;
}> = ({
    loadingTitle,
    loadingDescription
}) => {
    return (
        <MessageContent
            icon={CloudDownload}
            title={loadingTitle}
            description={loadingDescription}
        />
    )
}