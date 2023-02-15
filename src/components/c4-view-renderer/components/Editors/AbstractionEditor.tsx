import { Flex } from "@chakra-ui/react";
import { useReactFlow, useStore } from "@reactflow/core";
import { FC, useCallback } from "react";
import { MultiselectInputControl, StringInputControl, TextareaControl } from "../Controls";
import { selectedNodeSelector } from "../../store/BuilderStore";
import { Element } from "../../../../dsl";
import Technologies from "../../contracts/Technologies.json";

export type AbstractionEditorProps = unknown;

export const AbstractionEditor: FC<AbstractionEditorProps> = () => {
    const { setNodes } = useReactFlow();
    const selectedNode = useStore(selectedNodeSelector);

    const setNodeChanges = useCallback((changes: Partial<Element>) => {
        setNodes(nodes => nodes.map(node => {
            if (node.data.elementId !== selectedNode.data.elementId) {
                return node;
            }

            return {
                ...node,
                data: {
                    ...node.data,
                    ...changes
                }
            };
        }));
    }, [setNodes, selectedNode]);

    return (
        <Flex direction={"column"} gap={4}>
            <StringInputControl
                placeholder={"Enter the element name"}
                name={"Name"}
                value={selectedNode?.data.name}
                isRequired={true}
                // onChange={(event) => setNodeChanges({ name: event.target.value })}
            />
            <MultiselectInputControl
                placeholder={"Select technology"}
                name={"Technology"}
                options={Technologies.map(t => ({ name: t, value: t }))}
                value={selectedNode?.data.technology && selectedNode?.data.technology.map(t => ({ label: t, value: t }))}
                // onChange={() => setNodeChanges({
                //     technology: selectRef.current.getValue().map(option => option["value"])
                // })}
            />
            <TextareaControl
                placeholder={"Enter the element description"}
                name={"Description"}
                value={selectedNode?.data.description}
                // onChange={(event) => setNodeChanges({ description: event.target.value })}
            />
        </Flex>
    );
}