import { Flex } from "@chakra-ui/react";
import { defaultElementStyle, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren  } from "react";

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
}) => {
    const mergedStyle = {
        ...defaultElementStyle,
        ...style
    }

    return (
        <Flex
            border={"dashed"}
            borderWidth={2}
            borderColor={mergedStyle.stroke}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={mergedStyle.color}
        >
            {children}
        </Flex>
    );
}
