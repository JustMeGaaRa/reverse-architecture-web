import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const ThumbnailMore: FC<{
    count: number;
    outlineColor?: string;
    outlineRadius?: number;
    outlineWidth?: number;
}> = ({
    count,
    outlineColor,
    outlineRadius,
    outlineWidth
}) => {
    return (
        <Flex
            data-group
            backgroundColor={"surface.tinted-white-5"}
            borderRadius={outlineRadius ?? 12}
            borderWidth={outlineWidth}
            borderColor={outlineColor}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
        >
            <Text textStyle={"b2"} color={"gray.900"}>
                {`+${count} more`}
            </Text>
        </Flex>
    )
}