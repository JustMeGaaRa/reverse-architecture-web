import { GenericView } from "./GenericView";
import { DeploymentNode } from "../model/DeploymentNode";
import { All, Identifier } from "../model/Identifier";
import { Layout } from "./Layout";
export interface DeploymentView extends GenericView {
    softwareSystemIdentifier?: All | Identifier;
    environment: string;
    deploymentNodes: DeploymentNode[];
}
export declare function deploymentView(softwareSystemIdentifier: All | Identifier, environment: string, key?: string, title?: string, layout?: Layout, description?: string, deploymentNodes?: DeploymentNode[]): DeploymentView;
//# sourceMappingURL=DeploymentView.d.ts.map