import { FC, PropsWithChildren } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export type RoundedBoxProps = {
    background?: string;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const RoundedBox: FC<PropsWithChildren<RoundedBoxProps>> = ({
    children,
    background,
    width,
    height,
    selected
}) => {
    const elementBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const elementHighlightBorderColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

    return (
        <Flex
            background={background}
            borderWidth={1}
            borderColor={selected
                ? elementHighlightBorderColor
                : elementBorderColor
            }
            borderRadius={"2xl"}
            align={"center"}
            justify={"center"}
            padding={2}
            width={width}
            height={height}
            textColor={"whiteAlpha.900"}
        >
            {children}
        </Flex>
    );
}