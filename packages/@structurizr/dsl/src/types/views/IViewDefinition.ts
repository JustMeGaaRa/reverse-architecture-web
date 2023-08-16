import { AutoLayout } from "./AutoLayout";
import { ViewType } from "./ViewType";
import { Properties } from "../model/Properties";
import { Identifier } from "../model/Identifier";
import { IViewMetadata } from "../../metadata/IViewMetadata";

export interface IViewDefinition extends IViewMetadata {
    type: ViewType;
    identifier: Identifier;
    key?: string;
    title?: string;
    include?: string[];
    autoLayout?: AutoLayout;
    animation?: any;
    description?: string;
    properties?: Properties;
}

export type ViewKeys = Pick<IViewDefinition, "type" | "identifier" | "title">;