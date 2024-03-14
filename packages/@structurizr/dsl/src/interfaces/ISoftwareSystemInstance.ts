import {
    ElementType,
    Identifier, Tag, Url
} from "../types";
import { IHealthCheck } from "./IHealthCheck";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";


export interface ISoftwareSystemInstance {
    type: ElementType.SoftwareSystemInstance;
    identifier?: Identifier;
    softwareSystemIdentifier: Identifier;
    deploymentGroups?: Identifier[];
    relationships?: IRelationship[];
    description?: string;
    tags?: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    healthCheck?: IHealthCheck;
}
