import { Element, ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { Handle, Position } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { DefaultBox, RoundedBox } from "../Shapes";

export const ElementNode: FC<{
    data: Element;
    style: ElementStyleProperties;
    selected?: boolean;
}> = (props) => {
    switch (props.style.shape) {
        case ShapeType.RoundedBox:
            return (<RoundedBoxElement {...props} />);
        case ShapeType.Box:
            return (<DefaultBoxElement {...props} />);
        default:
            return (<DefaultBoxElement {...props} />);
    };
}

export function ElementShapeWhapper(ElementComponent: FC<PropsWithChildren<{
    style: ElementStyleProperties;
    selected?: boolean;
}>>): FC<{
    data: Element;
    style: ElementStyleProperties;
    selected?: boolean;
}> {
    return function WrappedElement({
        data,
        style,
        selected,
    }) {
        return (
            <ElementComponent style={style} selected={selected} >
                <ElementLabel data={data} style={style} showDescription />
                <Handle id={"a"} type={"source"} position={Position.Left} />
                <Handle id={"b"} type={"source"} position={Position.Top} />
                <Handle id={"c"} type={"source"} position={Position.Right} />
                <Handle id={"d"} type={"source"} position={Position.Bottom} />
            </ElementComponent>
        );
    }
}

export const DefaultBoxElement = ElementShapeWhapper(DefaultBox);
export const RoundedBoxElement = ElementShapeWhapper(RoundedBox);