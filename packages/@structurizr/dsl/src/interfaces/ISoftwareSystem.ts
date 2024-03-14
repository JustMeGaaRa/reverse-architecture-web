import {
    ElementType,
    Identifier, Tag,
    Technology,
    Url
} from "../types";
import { IElement } from "./IElement";
import { IPerspectives } from "./IPerspectives";
import { IProperties } from "./IProperties";
import { IGroup } from "./IGroup";
import { IRelationship } from "./IRelationship";
import { IContainer } from "./IContainer";


export interface ISoftwareSystem extends IElement {
    type: ElementType.SoftwareSystem;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    containers: IContainer[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
