import { ReactFlowJsonObject } from "@reactflow/core";
import {
    ISupportVisitor,
    IViewDefinition,
    IModel,
    IConfiguration,
} from "@structurizr/dsl";
import { AutoLayout, ReactFlowBuilder } from "@workspace/core";
import { ReactFlowVisitor } from "../types";

export const getReactFlowObject = (
    strategy: ISupportVisitor,
    model: IModel,
    configuration: IConfiguration,
    selectedView: IViewDefinition
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(
        model,
        configuration,
        selectedView,
        reactFlowBuilder
    );
    strategy?.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}
        
export const getReactFlowAuto = async (reactFlowObject: ReactFlowJsonObject) => {
    const autoLayout = new AutoLayout();
    const reactFlowAuto = await autoLayout.execute(reactFlowObject);
    return reactFlowAuto;
}