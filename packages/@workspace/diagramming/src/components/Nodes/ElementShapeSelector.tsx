import { ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { RoundedBox } from "../Shapes";

export const ElementShapeSelector: FC<PropsWithChildren<{
    style: ElementStyleProperties;
}>> = ({
    children,
    style
}) => {
    switch (style.shape) {
        case ShapeType.RoundedBox:
            return (
                <RoundedBox style={style}>
                    {children}
                </RoundedBox>
            );
        default:
            return (
                <RoundedBox style={style}>
                    {children}
                </RoundedBox>
            );
    };
}