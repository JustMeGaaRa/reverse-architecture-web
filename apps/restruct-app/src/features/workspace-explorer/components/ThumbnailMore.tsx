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
            _active={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)"
            }}
            _groupActive={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)"
            }}
            _hover={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            }}
            _groupHover={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            }}
        >
            <Text textStyle={"b2"} color={"gray.900"}>
                {`+${count} more`}
            </Text>
        </Flex>
    )
}