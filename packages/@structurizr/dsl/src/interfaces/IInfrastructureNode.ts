import {
    ElementType,
    Identifier, Tag,
    Technology,
    Url
} from "../types";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";


export interface IInfrastructureNode {
    type: ElementType.InfrastructureNode;
    identifier: Identifier;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
