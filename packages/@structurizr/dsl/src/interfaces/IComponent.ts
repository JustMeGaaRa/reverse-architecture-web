import {
    ElementType,
    Identifier, Tag,
    Technology,
    Url
} from "../types";
import { IElement } from "./IElement";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";


export interface IComponent extends IElement {
    type: ElementType.Component;
    identifier: Identifier;
    name: string;
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
