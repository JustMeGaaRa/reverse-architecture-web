import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Identifier } from "./Identifier";
import { ElementType } from "./ElementType";

export interface IElement {
    identifier: Identifier;
    type: ElementType;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}
