import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Identifier } from "./Identifier";
export interface Element {
    identifier: Identifier;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}
//# sourceMappingURL=Element.d.ts.map