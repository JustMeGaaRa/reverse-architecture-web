import {
    ElementType,
    Identifier, Tag,
    Technology
} from "../types";


export interface IElement {
    identifier: Identifier;
    type: ElementType;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}
