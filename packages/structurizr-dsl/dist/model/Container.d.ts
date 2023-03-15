import { Component } from "./Component";
import { Element } from "./Element";
import { Group } from "./Group";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Technology } from "./Technology";
import { Url } from "./Url";
export interface Container extends Element {
    identifier: Identifier;
    name: string;
    groups: Group[];
    components: Component[];
    description?: string;
    technology: Technology[];
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships: Relationship[];
}
export declare function toContainerString(container: Container): string;
export declare function toContainerArrayString(containers: Container[]): string;
export declare function container(identifier: Identifier, name: string, description?: string, technology?: Technology[], components?: Component[], tags?: Tag[]): Container;
//# sourceMappingURL=Container.d.ts.map