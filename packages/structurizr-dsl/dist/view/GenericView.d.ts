import { AutoLayout } from "./AutoLayout";
import { Properties } from "../model/Properties";
import { Layout } from "./Layout";
export interface GenericView {
    key?: string;
    autoLayout?: AutoLayout;
    layout?: Layout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
}
//# sourceMappingURL=GenericView.d.ts.map