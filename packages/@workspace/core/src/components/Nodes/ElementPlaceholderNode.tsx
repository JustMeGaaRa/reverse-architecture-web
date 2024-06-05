import { foldStyles, IElement, IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren, useMemo } from "react";
import { ElementVariant } from "../../contexts";
import { getVariantStyles, useWorkspace } from "../../hooks";
import { ReverseArchitectureElementStyle } from "../../types";
import { ElementContainer, ElementName, ElementType } from "./ElementLabel";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    element: IElement;
    style: IElementStyleProperties;
    height?: number;
    width?: number;
    variant?: ElementVariant;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    element,
    style,
    variant,
    onMouseEnter,
    onMouseLeave
}) => {
    const { workspace } = useWorkspace();

    const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);
    const elementStyle = useMemo(() => foldStyles(
        ReverseArchitectureElementStyle,
        workspace.views.configuration.styles.elements,
        element?.tags ?? []
    ), [element?.tags, workspace.views.configuration.styles.elements]);

    return (
        <ElementShapeSelector
            style={{
                ...elementStyle,
                height: variantStyles.container.height as number,
                width: variantStyles.container.width as number,
            }}
        >
            {/* <ElementFlowShortcut shortcutKeys={"Ctrl + ↑"} /> */}
            <ElementContainer style={variantStyles.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <ElementName name={element?.name} style={variantStyles.title} />
                <ElementType type={element.type} style={variantStyles.technology} />
            </ElementContainer>
            {children}
        </ElementShapeSelector>
    )
}