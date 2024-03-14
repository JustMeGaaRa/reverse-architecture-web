import {
    ElementType,
    Identifier, Tag, Url
} from "../types";
import { IElement } from "./IElement";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IRelationship } from "./IRelationship";


export interface IPerson extends IElement {
    type: ElementType.Person;
    identifier: Identifier;
    name: string;
    tags: Tag[];
    description?: string;
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
