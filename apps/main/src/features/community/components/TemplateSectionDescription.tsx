import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const TemplateSectionDescription: FC<{
    description: string;
}> = ({
    description,
}) => {
    return (
        <Flex padding={4} width={"100%"}>
            <Text color={"gray.900"} fontSize={"14px"}>
                {description}
            </Text>
        </Flex>
    );
}