import { Container } from "./Container";
import { Group } from "./Group";
import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";
import { Technology } from "./Technology";
export interface SoftwareSystem extends Element {
    identifier: Identifier;
    name: string;
    groups: Group[];
    containers: Container[];
    technology: Technology[];
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}
export declare function toSoftwareSystemString(software: SoftwareSystem): string;
export declare function toSoftwareSystemArrayString(softwareSystems: SoftwareSystem[]): string;
export declare function softwareSystem(identifier: Identifier, name: string, description?: string, containers?: Container[], tags?: Tag[]): SoftwareSystem;
//# sourceMappingURL=SoftwareSystem.d.ts.map