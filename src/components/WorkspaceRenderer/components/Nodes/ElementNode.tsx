import '@reactflow/node-resizer/dist/style.css';

import { Handle, NodeProps, Position } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { FC, PropsWithChildren, useCallback } from "react";
import { ExpandedElement } from "./ExpandedElement";
import { DeploymentNode } from './DeploymentNode';
import { DefaultBox, RoundedBox } from '../Shapes';
import { ExpandedElementLabel } from "../Labels/ExpandedElementLabel";
import { ElementLabel } from "../Labels/ElementLabel";
import { DeploymentNodeLabel } from "../Labels/DeploymentNodeLabel";
import {
    defaultElementStyle,
    Element,
    ElementStyleProperties,
    ShapeType,
    Tag,
    useWorkspace
} from '../../../../dsl';

type ShapeshiftElementProps = {
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    selected?: boolean;
}

const ShapeshiftElement: FC<PropsWithChildren<ShapeshiftElementProps>> = ({
    children,
    style,
    width,
    height,
    selected
}) => {
    const mergedStyle = {
        ...defaultElementStyle,
        ...style
    }
    const mergedProps = {
        style: mergedStyle,
        width,
        height,
        selected        
    }

    switch (mergedStyle.shape) {
        case ShapeType.RoundedBox:
            return (<RoundedBox {...mergedProps}>{children}</RoundedBox>);
        case ShapeType.Box:
            return (<DefaultBox {...mergedProps}>{children}</DefaultBox>);
        default:
            return (<RoundedBox {...mergedProps}>{children}</RoundedBox>);
    };
}

export type ElementNodeProps = ShapeshiftElementProps & {
    data: Element;
    expanded?: boolean;
}

export const ElementNode: FC<ElementNodeProps> = ({
    data,
    style,
    width = 300,
    height = 200,
    selected = false,
    expanded = false
}) => {
    const { setLayoutElement } = useWorkspace();
    const onResize = useCallback((event, params) => {
        setLayoutElement({
            // TODO: add view identifier
            ...params,
            elementIdentifier: data.identifier
        });
    }, [setLayoutElement, data]);

    if (data.tags.some(x => x.name === Tag.DeploymentNode.name)) {
        return (
            <DeploymentNode
                style={style}
                width={width}
                height={height}
                selected={selected}
            >
                <DeploymentNodeLabel
                    data={data}
                    style={style}
                />
                <NodeResizer
                    isVisible={selected}
                    minWidth={380}
                    minHeight={320}
                    handleStyle={{ width: 7, height: 7 }}
                    lineStyle={{ borderWidth: 0 }}
                    onResize={onResize}
                />
            </DeploymentNode>
        );
    }

    if (expanded) {
        return (
            <ExpandedElement
                style={style}
                width={width}
                height={height}
                selected={selected}
            >
                <ExpandedElementLabel
                    data={data}
                    style={style}
                />
                <NodeResizer
                    isVisible={selected}
                    minWidth={380}
                    minHeight={320}
                    handleStyle={{ width: 7, height: 7 }}
                    lineStyle={{ borderWidth: 0 }}
                    onResize={onResize}
                />
            </ExpandedElement>
        );
    }
    
    return (
        <ShapeshiftElement
            style={style}
            width={width}
            height={height}
            selected={selected}
        >
            <ElementLabel data={data} style={style} showDescription />
            <Handle id={"a"} type={"source"} position={Position.Left} />
            <Handle id={"b"} type={"source"} position={Position.Top} />
            <Handle id={"c"} type={"source"} position={Position.Right} />
            <Handle id={"d"} type={"source"} position={Position.Bottom} />
        </ShapeshiftElement>
    );
}

export type ElementNodeWrapperProps = {
    element: Element;
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    expanded?: boolean;
    draggedOver?: boolean;
}

export const ElementNodeWrapper: FC<NodeProps<ElementNodeWrapperProps>> = ({
    data,
    selected
}) => {
    return (
        <ElementNode
            data={data.element}
            style={data.style}
            width={data.width}
            height={data.height}
            selected={data.draggedOver || selected}
            expanded={data.expanded}
        />
    );
}