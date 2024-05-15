import { AutoLayoutDirection } from "../types";

export interface IAutoLayout {
    direction: AutoLayoutDirection;
    rankSeparation: number;
    nodeSeparation: number;
}

export interface IAutoLayoutStrategy<T> {
    execute(graph: T): Promise<T>;
}