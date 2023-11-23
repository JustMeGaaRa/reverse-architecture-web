import { Flex, Icon } from "@chakra-ui/react";
import { MediaImage } from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const ThumbnailImage: FC<PropsWithChildren<{
    url?: string;
    outlineColor?: string;
    outlineRadius?: number;
    outlineWidth?: number;
}>> = ({
    children,
    url,
    outlineColor,
    outlineRadius,
    outlineWidth
}) => {
    return (
        <Flex
            data-group
            background={`url(${url}), rgba(255, 255, 255, 0.05)`}
            borderRadius={outlineRadius ?? 12}
            borderWidth={outlineWidth}
            borderColor={outlineColor}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            height={"100%"}
            width={"100%"}
            _active={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${url})`
            }}
            _groupActive={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${url})`
            }}
            _hover={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${url})`
            }}
            _groupHover={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${url})`
            }}
        >
            {!url && (
                <Icon
                    as={MediaImage}
                    color={"gray.900"}
                    fontSize={32}
                    strokeWidth={1}
                />
            )}

            {children}
        </Flex>
    )
}