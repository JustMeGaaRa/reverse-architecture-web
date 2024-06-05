import { useReactFlow } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { FC, useCallback } from "react";
import { useNode, useSelectedNodes } from "../../hooks";
import { ReactFlowNodeProps, StructurizrViewElementProps } from "./StructurizrViewElementProps";

export function ReactFlowViewElementBoundaryAdapter(ElementBoundaryComponent: FC<StructurizrViewElementProps>): FC<ReactFlowNodeProps> {
    return function ReactFlowBoundaryComponent({ id, data, selected }) {
        const { isLocked } = useNode(id);
        const { selectedNodes } = useSelectedNodes();
        const { setNodes } = useReactFlow();
        
        // TODO: consider using useResizeObserver
        // TODO: set element size in the workspace view metadata
        const onResize = useCallback((event, params) => {
            setNodes(nodes => {
                return nodes.map(node => node.id !== data.element.identifier
                    ? node
                    : {
                        ...node,
                        data: {
                            ...node.data,
                            width: params.width,
                            height: params.height,
                        },
                    })
            });
        }, [data.element.identifier, setNodes]);

        return (
            <ElementBoundaryComponent
                element={data.element}
                height={data.height}
                width={data.width}
                isSelected={selected}
                isLocked={isLocked}
            >
                {/* <NodeResizer
                    isVisible={selected && selectedNodes.length === 1}
                    color={"#E3FB51"}
                    minWidth={300}
                    minHeight={300}
                    handleStyle={{
                        backgroundColor: "#E3FB51",
                        borderWidth: 0,
                        borderRadius: 2,
                        width: 7,
                        height: 7,
                    }}
                    lineStyle={{ borderWidth: 0 }}
                    onResize={onResize}
                /> */}
            </ElementBoundaryComponent>
        )
    }
}