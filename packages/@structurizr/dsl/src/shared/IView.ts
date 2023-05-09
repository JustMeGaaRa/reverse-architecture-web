import { IViewDefinition } from "./IViewDefinition";
import { AutoLayout } from "../types/views/AutoLayout";
import { Properties } from "../types/model/Properties";
import { IVIewMetadata } from "./IVIewMetadata";

export interface IView extends IViewDefinition, IVIewMetadata {
    key?: string;
    autoLayout?: AutoLayout;
    animation?: any;
    description?: string;
    properties?: Properties;
}