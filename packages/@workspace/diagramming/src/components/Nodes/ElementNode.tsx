import { IElement, ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { FC } from "react";
import { RoundedBox } from "../Shapes";
import { ElementShapeWhapper } from "./ElementShapeWhapper";

const RoundedBoxElementNode = ElementShapeWhapper(RoundedBox);

export const ElementNode: FC<{
    data: IElement;
    style: ElementStyleProperties;
    selected?: boolean;
}> = (props) => {
    switch (props.style.shape) {
        case ShapeType.RoundedBox:
            return (<RoundedBoxElementNode {...props} />);
        default:
            return (<RoundedBoxElementNode {...props} />);
    };
}