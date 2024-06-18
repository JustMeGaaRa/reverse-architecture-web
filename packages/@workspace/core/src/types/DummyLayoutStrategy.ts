import { ReactFlowJsonObject } from "@reactflow/core";
import { IAutoLayoutStrategy } from "@structurizr/dsl";

export class DummyLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    execute(graph: ReactFlowJsonObject<any, any>): Promise<ReactFlowJsonObject<any, any>> {
        return Promise.resolve(graph);
    }
}