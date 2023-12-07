import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    data: IElement;
    style: ElementStyleProperties;
    height?: number;
    width?: number;
    isHovered?: boolean;
    isSelected?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    data,
    style,
    isHovered,
    isSelected,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <ElementShapeSelector isSelected={isSelected} style={style}>
            {children}
        </ElementShapeSelector>
    )
}