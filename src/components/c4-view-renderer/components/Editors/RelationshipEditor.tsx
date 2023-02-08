import {
    Flex,
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react";
import { useReactFlow, useStore } from "@reactflow/core";
import { FC, useCallback, useRef } from "react";
import { Select, SelectInstance } from "chakra-react-select";
import { Panel } from "../Panels";
import { selectedEdgeSelector } from "../../store/BuilderStore";
import { Relationship } from "../../store/Diagram";
import Technologies from "../../contracts/Technologies.json";

export type RelationshipEditorProps = unknown;

export const RelationshipEditor: FC<RelationshipEditorProps> = () => {
    const selectRef = useRef<SelectInstance>(null);
    const { setEdges } = useReactFlow();
    const selectedEdge = useStore(selectedEdgeSelector);

    const setEdgeChanges = useCallback((changes: Partial<Relationship>) => {
        setEdges(edges => edges.map(edge => {
            if (edge.data.relationshipId !== selectedEdge?.data.relationshipId) {
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
    }, [setEdges, selectedEdge]);

    return selectedEdge?.data && (
        <Panel
            dock={"right-center"}
            padding={4}
        >
            <Flex direction={"column"} gap={4} width={["xs"]}>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        placeholder={"Enter the relationship description"}
                        value={selectedEdge?.data.description}
                        onChange={(event) => setEdgeChanges({ description: event.target.value })}
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
                        value={selectedEdge?.data.technology && selectedEdge?.data.technology.map(t => ({ label: t, value: t }))}
                        onChange={() => setEdgeChanges({
                            technology: selectRef.current.getValue().map(option => option["value"])
                        })}
                    />
                </FormControl>
            </Flex>
        </Panel>
    );
}