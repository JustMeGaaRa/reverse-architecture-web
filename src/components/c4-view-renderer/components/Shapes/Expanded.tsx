import { FC, PropsWithChildren  } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export type ExpandedProps = {
    width?: number;
    height?: number;
    selected?: boolean,
}

export const Expanded: FC<PropsWithChildren<ExpandedProps>> = ({
    children,
    width,
    height,
    selected
}) => {
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
            borderWidth={1}
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