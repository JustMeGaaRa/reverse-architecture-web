import { IViewDefinition } from "./IViewDefinition";
import { AutoLayout } from "../types/views/AutoLayout";
import { Layout } from "../types/views/Layout";
import { Properties } from "../types/model/Properties";

export interface IView extends IViewDefinition {
    key?: string;
    autoLayout?: AutoLayout;
    layout: Layout;
    animation?: any;
    description?: string;
    properties?: Properties;
}