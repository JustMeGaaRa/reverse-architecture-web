import { AutoLayout } from "./AutoLayout";
import { Properties } from "../model/Properties";
import { Layout } from "./Layout";

export interface GenericView {
    // type?: string;
    key?: string;
    autoLayout?: AutoLayout;
    layout: Layout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
}
