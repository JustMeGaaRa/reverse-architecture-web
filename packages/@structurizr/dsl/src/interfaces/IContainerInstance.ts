import {
    ElementType,
    Identifier, Tag, Url
} from "../types";
import { IHealthCheck } from "./IHealthCheck";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";


export interface IContainerInstance {
    type: ElementType.ContainerInstance;
    identifier?: Identifier;
    containerIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    healthCheck?: IHealthCheck;
}
