import { FC, PropsWithChildren } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { ElementStyleProperties } from "../../store/C4Diagram";

export type DefaultBoxProps = {
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const DefaultBox: FC<PropsWithChildren<DefaultBoxProps>> = ({
    children,
    style,
    width,
    height,
    selected
}) => {
    const elementBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const elementHighlightBorderColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

    return (
        <Flex
            background={style.background}
            borderWidth={1}
            borderColor={selected
                ? elementHighlightBorderColor
                : elementBorderColor
            }
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