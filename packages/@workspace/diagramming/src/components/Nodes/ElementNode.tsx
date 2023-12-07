import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { ElementShapeSelector } from "./ElementShapeSelector";

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