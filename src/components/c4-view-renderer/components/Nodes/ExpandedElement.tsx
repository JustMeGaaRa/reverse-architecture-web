import { Flex, useColorModeValue } from "@chakra-ui/react";
import { FC, PropsWithChildren  } from "react";
import { defaultElementStyle, ElementStyleProperties } from "../../store/C4Diagram";

export type ExpandedElementProps = {
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const ExpandedElement: FC<PropsWithChildren<ExpandedElementProps>> = ({
    children,
    style,
    width,
    height,
    selected
}) => {
    const mergedStyle = {
        ...defaultElementStyle,
        ...style
    }
    const parentBgColor = useColorModeValue("blackAlpha.300", "blackAlpha.400");
    const parentHighlightBgColor = useColorModeValue("blackAlpha.400", "blackAlpha.500");
    
    const parentBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const parentHighlightBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

    return (
        <Flex
            background={selected
                ? parentHighlightBgColor
                : parentBgColor
            }
            border={"dashed"}
            borderWidth={2}
            borderColor={selected
                ? parentHighlightBorderColor
                : parentBorderColor
            }
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={"whiteAlpha.900"}
        >
            {children}
        </Flex>
    );
}
