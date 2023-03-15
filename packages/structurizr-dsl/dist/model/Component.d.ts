import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";
export interface Component extends Element {
    identifier: Identifier;
    name: string;
    description?: string;
    technology: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: Relationship[];
}
export declare function toComponentString(component: Component): string;
export declare function toComponentArrayString(components: Component[]): string;
export declare function component(identifier: Identifier, name: string, description?: string, technology?: Technology[], tags?: Tag[]): Component;
//# sourceMappingURL=Component.d.ts.map