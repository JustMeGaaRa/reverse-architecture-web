import { GenericView } from "./GenericView";
import { DeploymentNode } from "../model/DeploymentNode";
import { All, Identifier } from "../model/Identifier";
import { Layout } from "./Layout";

export interface DeploymentView extends GenericView {
    // type: "Deployment",
    softwareSystemIdentifier?: All | Identifier;
    environment: string;
    deploymentNodes?: DeploymentNode[];
}

export function deploymentView(
    softwareSystemIdentifier: All | Identifier,
    environment: string,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
    deploymentNodes?: DeploymentNode[],
): DeploymentView {
    return {
        softwareSystemIdentifier,
        environment,
        key,
        layout,
        title,
        description,
        deploymentNodes
    }
}