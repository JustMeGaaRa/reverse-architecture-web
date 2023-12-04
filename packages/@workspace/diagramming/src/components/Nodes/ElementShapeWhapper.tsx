import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { Position, useStore } from "@reactflow/core";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import { ElementHandle } from "./ElementHandle";
import { ElementZoomControl } from "./ElementZoomControl";
import { ElementLabel } from "./ElementLabel";
import { ReactFlowNodeHandle } from "./ReactFlowNodeHandle";

export function ElementShapeWhapper(ShapeComponent: FC<PropsWithChildren<{
    style: ElementStyleProperties;
    isSelected?: boolean;
}>>): FC<{
    data: IElement;
    style: ElementStyleProperties;
    selected?: boolean;
}> {
    return function ElementNodeComponent({
        data,
        style,
        selected,
    }) {
        const positions = [Position.Left, Position.Top, Position.Right, Position.Bottom];
        const isTarget = useStore(state => state.connectionNodeId && state.connectionNodeId !== data.identifier);
        const [ isHandleVisible, setIsHandleVisible ] = useState(false);

        const handleOnZoomClick = useCallback(() => {
            // TODO: call zoom function from the workspace hook
        }, []);

        const handleOnMouseOver = useCallback(() => {
            setIsHandleVisible(true);
        }, []);

        const handleOnMouseLeave = useCallback(() => {
            setIsHandleVisible(false);
        }, []);

        return (
            <ShapeComponent
                data-group
                isSelected={selected}
                style={style}
            >
                {positions.map((position) => (
                    <ElementHandle
                        key={`handle-arrow-${position}`}
                        position={position}
                        isSelected={selected}
                        isVisibile={isHandleVisible}
                    />
                ))}
                {isTarget && (
                    <ReactFlowNodeHandle
                        position={Position.Left}
                        type={"target"}
                    />
                )}
                <ElementZoomControl
                    isSelected={selected}
                    isVisible={isHandleVisible}
                    onZoomClick={handleOnZoomClick}
                />
                <ElementLabel
                    data={data}
                    style={style}
                    isSelected={selected}
                    showDescription
                    onMouseOver={handleOnMouseOver}
                    onMouseLeave={handleOnMouseLeave}
                />
            </ShapeComponent>
        );
    }
}