import { IElement, ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { RoundedBox } from "../Shapes";
import { ElementLabel } from "./ElementLabel";

export const ElementShapeSelector: FC<PropsWithChildren<{
    isSelected?: boolean;
    style: ElementStyleProperties;
}>> = ({
    children,
    isSelected,
    style
}) => {
    switch (style.shape) {
        case ShapeType.RoundedBox:
            return (
                <RoundedBox isSelected={isSelected} style={style}>
                    {children}
                </RoundedBox>
            );
        default:
            return (
                <RoundedBox isSelected={isSelected} style={style}>
                    {children}
                </RoundedBox>
            );
    };
}

export const ElementNode: FC<PropsWithChildren<{
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
            <ElementLabel
                data={data}
                style={style}
                showDescription
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {children}
        </ElementShapeSelector>
    )
}

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