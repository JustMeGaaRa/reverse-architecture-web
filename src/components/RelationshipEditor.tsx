import { FC, MouseEventHandler, useCallback, useRef } from "react";
import { useReactFlow } from "@reactflow/core";
import {
    Flex,
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react";
import { Select, SelectInstance } from "chakra-react-select";
import { Relationship, RelationshipCallback } from "./c4-diagram";

export type RelationshipEditorProps = {
    data: Relationship;
    technologies: Array<string>;
    onChange?: RelationshipCallback;
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const RelationshipEditor: FC<RelationshipEditorProps> = ({
    data,
    technologies
}) => {
    const selectRef = useRef<SelectInstance>(null);
    const { setEdges } = useReactFlow();

    const setEdgeChanges = useCallback((changes: Partial<Relationship>) => {
        setEdges(edges => edges.map(edge => {
            if (edge.data.relationshipId !== data.relationshipId) {
                return edge;
            }

            return {
                ...edge,
                data: {
                    ...edge.data,
                    ...changes
                }
            };
        }));
    }, [setEdges, data]);

    return data && (
        <Flex direction={"column"} gap={4} width={["xs"]}>
            <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                    value={data.description}
                    placeholder={"Enter the relationship description"}
                    onBlur={(event) => setEdgeChanges({ description: event.target.value })}
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
                    onBlur={() => setEdgeChanges({
                        technology: selectRef.current.getValue().map(option => option["value"])
                    })}
                />
            </FormControl>
        </Flex>
    );
}