import { FC, MouseEventHandler, useCallback, useRef } from "react";
import { useReactFlow } from "@reactflow/core";
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from "@chakra-ui/react";
import { Select, SelectInstance } from "chakra-react-select";
import { Element, ElementCallback } from "./c4-diagram";

export type AbstractionEditorProps = {
    data: Element;
    technologies: Array<string>;
    onChange?: ElementCallback;
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const AbstractionEditor: FC<AbstractionEditorProps> = ({
    data,
    technologies
}) => {
    const selectRef = useRef<SelectInstance>(null);
    const { setNodes } = useReactFlow();

    const setNodeChanges = useCallback((changes: Partial<Element>) => {
        setNodes(nodes => nodes.map(node => {
            if (node.data.elementId !== data.elementId) {
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
    }, [setNodes, data]);

    return data && (
        <Flex direction={"column"} gap={4} width={["xs"]}>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder={"Enter the element name"}
                    defaultValue={data.name}
                    onBlur={(event) => setNodeChanges({ name: event.target.value })}
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
                    options={technologies.map(t => ({ label: t, value: t }))}
                    defaultValue={data.technology && data.technology.map(t => ({ label: t, value: t }))}
                    onBlur={() => setNodeChanges({
                        technology: selectRef.current.getValue().map(option => option["value"])
                    })}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                    placeholder={"Enter the element description"}
                    defaultValue={data.description}
                    onBlur={(event) => setNodeChanges({ description: event.target.value })}
                />
            </FormControl>
        </Flex>
    );
}