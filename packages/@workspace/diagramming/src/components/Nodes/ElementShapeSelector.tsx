import { ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { RoundedBox } from "../Shapes";

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