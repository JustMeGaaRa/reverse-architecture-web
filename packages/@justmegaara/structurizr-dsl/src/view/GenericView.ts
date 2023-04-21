import { AutoLayout } from "./AutoLayout";
import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { Identifier } from "../model/Identifier";

export type ViewType = 
    "System Landscape"
    | "System Context"
    | "Container"
    | "Component"
    | "Deployment";

export interface GenericView {
    type: ViewType;
    identifier: Identifier;
    key?: string;
    autoLayout?: AutoLayout;
    layout?: Layout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
}
