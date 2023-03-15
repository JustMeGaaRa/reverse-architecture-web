import { Flex } from "@chakra-ui/react";
import { defaultElementStyle, ElementStyleProperties } from "@justmegaara/structurizr-dsl";
import { FC, PropsWithChildren } from "react";

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
}) => {
    const mergedStyle = {
        ...defaultElementStyle,
        ...style
    }

    return (
        <Flex
            background={mergedStyle.background}
            borderWidth={mergedStyle.strokeWidth}
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