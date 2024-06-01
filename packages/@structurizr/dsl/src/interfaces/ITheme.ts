import {
    ElementStyleCollection,
    RelationshipStyleCollection
} from "../types";

export interface ITheme {
    name: string;
    description: string;
    elements: ElementStyleCollection;
    relationships: RelationshipStyleCollection;
}
