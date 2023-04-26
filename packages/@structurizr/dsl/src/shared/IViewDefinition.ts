import { Identifier } from "../types/model/Identifier";
import { ViewType } from "../types/views/ViewType";

export interface IViewDefinition {
    type: ViewType;
    identifier: Identifier;
    title?: string;
}