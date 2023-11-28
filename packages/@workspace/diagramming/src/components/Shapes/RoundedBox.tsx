import { Box, Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export type RoundedBoxProps = {
    style: ElementStyleProperties;
    isSelected?: boolean,
}

export const RoundedBox: FC<PropsWithChildren<RoundedBoxProps>> = ({
    children,
    style,
    isSelected
}) => {
    return (
        <Box
            aria-selected={isSelected}
            borderRadius={"17px"}
            borderWidth={1}
            position={"relative"}
            _selected={{
                borderColor: "lime.600"
            }}
        >
            <Flex
                data-group
                backgroundColor={"gray.200"}
                borderColor={"gray.400"}
                borderRadius={"2xl"}
                borderWidth={style.strokeWidth ?? 2}
                cursor={"pointer"}
                align={"center"}
                justify={"center"}
                padding={2}
                height={style.height}
                width={style.width}
            >
                {children}
            </Flex>
        </Box>
    );
}