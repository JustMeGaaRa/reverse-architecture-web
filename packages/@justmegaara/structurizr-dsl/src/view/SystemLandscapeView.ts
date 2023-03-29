import { GenericView } from "./GenericView";
import { SoftwareSystem } from "../model/SoftwareSystem";
import { Person } from "../model/Person";
import { Layout } from "./Layout";

export interface SystemLandscapeView extends GenericView {
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
}

export function systemLandscapeView(
    title?: string,
    key?: string,
    layout?: Layout,
    people?: Person[],
    softwareSystems?: SoftwareSystem[]
): SystemLandscapeView {
    return {
        title,
        key,
        layout,
        people,
        softwareSystems
    }
}