import { Element } from "./Element";
import { Identifier } from "./Identifier";
import { Perspectives } from "./Perspectives";
import { Properties } from "./Properties";
import { Relationship } from "./Relationship";
import { Tag } from "./Tag";
import { Url } from "./Url";
export interface Person extends Omit<Element, "description" | "technology"> {
    identifier: Identifier;
    name: string;
    description?: string;
    tags: Tag[];
    url?: Url;
    properties?: Properties;
    perspectives?: Perspectives;
    relationships?: Relationship[];
}
export declare function toPersonString(person: Person): string;
export declare function toPersonArrayString(persons: Person[]): string;
export declare function person(identifier: Identifier, name: string, description?: string, tags?: Tag[]): Person;
//# sourceMappingURL=Person.d.ts.map