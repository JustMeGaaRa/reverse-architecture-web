import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementNode: FC<PropsWithChildren<{
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