import {
    ElementType,
    Identifier, Tag,
    Technology,
    Url
} from "../types";
import { IContainerInstance } from "./IContainerInstance";
import { IElement } from "./IElement";
import { ISoftwareSystemInstance } from "./ISoftwareSystemInstance";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";
import { IInfrastructureNode } from "./IInfrastructureNode";


export interface IDeploymentNode extends IElement {
    type: ElementType.DeploymentNode;
    identifier: Identifier;
    name: string;
    deploymentNodes: IDeploymentNode[];
    infrastructureNodes: IInfrastructureNode[];
    softwareSystemInstances: ISoftwareSystemInstance[];
    containerInstances: IContainerInstance[];
    technology: Technology[];
    description?: string;
    instances?: number;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
