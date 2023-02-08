import { Result, Ok, Err } from "@sniptt/monads";
import { ReactFlowJsonObject } from "@reactflow/core";

const isReactFlowJsonObject = (
    value: object
): value is ReactFlowJsonObject => {
    const flow = value as ReactFlowJsonObject;
    return flow.nodes !== undefined
        && flow.edges !== undefined
        && flow.viewport !== undefined;
}

export const parseReactFlow = (
    json: string
): Result<ReactFlowJsonObject, Error> => {
    try {
        const flow = JSON.parse(json);

        return isReactFlowJsonObject(flow)
            ? Ok(flow)
            : Err(new Error("The file content is not assignable to React Flow JSON object."));
    }
    catch (error) {
        return Err(new Error("The file content is not a valid JSON."));
    }
}