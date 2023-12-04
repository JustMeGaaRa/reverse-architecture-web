import { Box, Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const RoundedBox: FC<PropsWithChildren<{
    style: ElementStyleProperties;
    isSelected?: boolean,
}>> = ({
    children,
    style,
    isSelected
}) => {
    return (
        <Box
            aria-label={"rounded box outline"}
            aria-selected={isSelected}
            borderColor={"transparent"}
            borderRadius={"17px"}
            borderWidth={1}
            position={"relative"}
            _selected={{ borderColor: "lime.600" }}
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
                padding={1}
                height={style.height}
                width={style.width}
            >
                {children}
            </Flex>
        </Box>
    );
}