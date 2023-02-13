import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from "@chakra-ui/react";
import { useReactFlow, useStore } from "@reactflow/core";
import { FC, useCallback, useRef } from "react";
import { Select, SelectInstance } from "chakra-react-select";
import { Panel } from "../Panels";
import { selectedNodeSelector } from "../../store/BuilderStore";
import { Element } from "../../../../dsl";
import Technologies from "../../contracts/Technologies.json";

export type AbstractionEditorProps = unknown;

export const AbstractionEditor: FC<AbstractionEditorProps> = () => {
    const selectRef = useRef<SelectInstance>(null);
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

    return selectedNode?.data && (
        <Panel
            dock={"right-center"}
            padding={4}
        >
            <Flex direction={"column"} gap={4} width={["xs"]}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        placeholder={"Enter the element name"}
                        value={selectedNode?.data.name}
                        onChange={(event) => setNodeChanges({ name: event.target.value })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Technology</FormLabel>
                    <Select
                        ref={selectRef}
                        closeMenuOnSelect={false}
                        isClearable={false}
                        isMulti
                        useBasicStyles
                        placeholder={"Select technology"}
                        options={Technologies.map(t => ({ label: t, value: t }))}
                        value={selectedNode?.data.technology && selectedNode?.data.technology.map(t => ({ label: t, value: t }))}
                        onChange={() => setNodeChanges({
                            technology: selectRef.current.getValue().map(option => option["value"])
                        })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        placeholder={"Enter the element description"}
                        value={selectedNode?.data.description}
                        onChange={(event) => setNodeChanges({ description: event.target.value })}
                    />
                </FormControl>
            </Flex>
        </Panel>
    );
}