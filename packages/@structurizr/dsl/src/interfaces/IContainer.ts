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
import { IComponent } from "./IComponent";


export interface IContainer extends IElement {
    type: ElementType.Container;
    identifier: Identifier;
    name: string;
    groups: IGroup[];
    components: IComponent[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: IProperties;
    perspectives?: IPerspectives;
    relationships: IRelationship[];
}
