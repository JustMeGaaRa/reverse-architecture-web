import { Box, Flex } from "@chakra-ui/react";
import { IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const RoundedBox: FC<PropsWithChildren<{
    style: IElementStyleProperties;
}>> = ({
    children,
    style,
}) => {
    return (
        <Box
            aria-label={"rounded box outline"}
            borderColor={"transparent"}
            borderRadius={"17px"}
            borderWidth={1}
            position={"relative"}
        >
            <Flex
                aria-label={"rounded box"}
                backgroundColor={"gray.200"}
                borderColor={"gray.400"}
                borderRadius={16}
                borderWidth={style.strokeWidth ?? 2}
                cursor={"pointer"}
                align={"center"}
                justify={"center"}
                opacity={style.opacity ?? 1}
                padding={1}
                height={style.height}
                width={style.width}
            >
                {children}
            </Flex>
        </Box>
    );
}