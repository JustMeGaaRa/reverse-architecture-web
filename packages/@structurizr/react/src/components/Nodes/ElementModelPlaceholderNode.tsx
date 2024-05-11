import { Box, Flex, Text } from "@chakra-ui/react";
import { foldStyles, IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren, useMemo } from "react";
import { ElementVariant } from "../../contexts";
import { getVariantStyles, useWorkspace } from "../../hooks";
import { ReverseArchitectureElementStyle } from "../../types";
import { ElementNumberLabel, ElementName, ElementType } from "./ElementLabel";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementModelPlaceholderNode: FC<PropsWithChildren<{
    element: IElement;
    elementChildrenCount?: number;
    variant?: ElementVariant;
}>> = ({
    children,
    element,
    elementChildrenCount,
    variant,
}) => {
    const { workspace } = useWorkspace();

    const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);
    const elementStyle = useMemo(() => foldStyles(
        ReverseArchitectureElementStyle,
        workspace.views.configuration.styles.elements,
        element.tags
    ), [element.tags, workspace.views.configuration.styles.elements]);
    
    return (
        <ElementShapeSelector
            style={{
                ...elementStyle,
                height: variantStyles.container.height as number,
                width: variantStyles.container.width as number,
            }}
        >
            <ElementName name={element.name} style={variantStyles.title} />
            <ElementType type={element.type} style={variantStyles.technology} />
            <ElementNumberLabel number={elementChildrenCount} style={variantStyles.technology} />
            {children}
        </ElementShapeSelector>
    )
}