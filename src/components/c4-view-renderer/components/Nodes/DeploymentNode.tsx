import { Flex, useColorModeValue } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { defaultElementStyle, ElementStyleProperties } from "../../store/C4Diagram";

export type DeploymentNodeProps = {
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const DeploymentNode: FC<PropsWithChildren<DeploymentNodeProps>> = ({
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
    const parentBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.400");
    const parentHighlightBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

    return (
        <Flex
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