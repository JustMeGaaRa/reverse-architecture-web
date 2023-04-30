import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";

export const EmptyContent: FC<{
    icon: any;
    title: string;
    description: string;
}> = ({
    icon,
    title,
    description
}) => {
    return (
        <Flex
            alignItems={"center"}
            direction={"column"}
            textAlign={"center"}
            maxWidth={500}
        >
            <Icon as={icon} fontSize={70} strokeWidth={.4} mb={4} />
            <Text
                fontSize={20}
                color={"basic.White"}
            >
                {title}
            </Text>
            <Text
                fontSize={16}
                color={"gray.700"}
            >
                {description}
            </Text>
        </Flex>
    );
}