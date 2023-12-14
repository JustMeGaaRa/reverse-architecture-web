import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    data: IElement;
    style: ElementStyleProperties;
    height?: number;
    width?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    data,
    style,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <ElementShapeSelector style={style}>
            {children}
        </ElementShapeSelector>
    )
}