import { Flex } from "@chakra-ui/react";
import { Relationship } from "@justmegaara/structurizr-dsl";
import { ReactFlowState, useReactFlow, useStore } from "@reactflow/core";
import { FC, useCallback } from "react";
import {
    MultiselectInputControl,
    TextareaControl
} from "../Controls";

const selectedEdgeSelector = (state: ReactFlowState) => Array.from(state.edges).find(edge => edge.selected);

export type RelationshipEditorProps = unknown;

export const RelationshipEditor: FC<RelationshipEditorProps> = () => {
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

    return (
        <Flex direction={"column"} gap={4}>
            <TextareaControl
                placeholder={"Enter the relationship description"}
                name={"Description"}
                value={selectedEdge?.data.description}
                isRequired={true}
                // onChange={(event) => setEdgeChanges({ description: event.target.value })}
            />
            <MultiselectInputControl
                placeholder={"Select technology"}
                name={"Technology"}
                value={selectedEdge?.data.technology && selectedEdge?.data.technology.map(t => ({ name: t, value: t }))}
                options={[].map(t => ({ name: t, value: t }))}
                // onChange={() => setEdgeChanges({
                //     technology: selectRef.current.getValue().map(option => option["value"])
                // })}
            />
        </Flex>
    );
}