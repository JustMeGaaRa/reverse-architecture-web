import { Flex } from "@chakra-ui/react";
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

    return (
        <Flex
            border={"dashed"}
            borderWidth={2}
            borderColor={mergedStyle.background}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={mergedStyle.background}
        >
            {children}
        </Flex>
    );
}
