import {
    ElementType,
    Identifier, Tag
} from "../types";
import { IComponent } from "./IComponent";
import { IContainer } from "./IContainer";
import { IElement } from "./IElement";
import { IPerson } from "./IPerson";
import { ISoftwareSystem } from "./ISoftwareSystem";


export interface IGroup extends IElement {
    type: ElementType.Group;
    identifier: Identifier;
    name: string;
    tags: Tag[];
    people: IPerson[];
    softwareSystems: ISoftwareSystem[];
    containers: IContainer[];
    components: IComponent[];
}
