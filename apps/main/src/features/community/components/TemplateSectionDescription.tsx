import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const TemplateSectionDescription: FC<{
    description: string;
}> = ({
    description,
}) => {
    return (
        <Text color={"gray.900"} textStyle={"b3"}>
            {description}
        </Text>
    );
}