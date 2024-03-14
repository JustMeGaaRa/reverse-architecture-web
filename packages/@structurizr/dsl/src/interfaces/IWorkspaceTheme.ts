import {
    ElementStyleCollection,
    RelationshipStyleCollection
} from "../types";


export interface IWorkspaceTheme {
    name: string;
    description: string;
    lastModifiedDate: Date;
    elements: ElementStyleCollection;
    relationships: RelationshipStyleCollection;
}
