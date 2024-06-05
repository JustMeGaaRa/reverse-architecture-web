import { foldStyles, IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren, useMemo } from "react";
import { ElementVariant } from "../../contexts";
import { getVariantStyles, useWorkspace } from "../../hooks";
import { ReverseArchitectureElementStyle } from "../../types";
import { formatElementTechnology } from "../../utils";
import { ElementProvider } from "../WorkspaceProvider";
import { ElementContainer, ElementDescription, ElementTechnology, ElementName, ElementType } from "./ElementLabel";
import { ElementLockedIcon } from "./ElementLockedIcon";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementNode: FC<PropsWithChildren<{
    element: IElement;
    height?: number;
    width?: number;
    isLocked?: boolean;
    isReadonly?: boolean;
    isSelected?: boolean;
    variant?: ElementVariant;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    element,
    isLocked,
    isReadonly,
    isSelected,
    variant,
    onMouseEnter,
    onMouseLeave
}) => {
    const { workspace } = useWorkspace();

    const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);
    const elementStyle = useMemo(() => foldStyles(
        ReverseArchitectureElementStyle,
        workspace.views.configuration.styles.elements,
        element.tags
    ), [element.tags, workspace.views.configuration.styles.elements]);

    return (
        <ElementProvider isReadonly={isReadonly}>
            <ElementShapeSelector
                isSelected={isSelected}
                style={{
                    ...elementStyle,
                    height: variantStyles.container.height as number,
                    width: variantStyles.container.width as number,
                }}
            >
                <ElementContainer style={variantStyles.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <ElementName name={element.name} style={variantStyles.title} />
                    <ElementType type={element.type} style={variantStyles.technology} />
                    <ElementDescription description={element.description} style={variantStyles.description} />
                    <ElementTechnology technology={formatElementTechnology(element)} style={variantStyles.technology} />
                    <ElementLockedIcon isLocked={isLocked} />
                </ElementContainer>
                {children}
            </ElementShapeSelector>
        </ElementProvider>
    )
}