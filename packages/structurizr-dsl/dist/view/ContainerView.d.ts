import { GenericView } from "./GenericView";
import { Identifier } from "../model/Identifier";
import { SoftwareSystem } from "../model/SoftwareSystem";
import { Person } from "../model/Person";
import { Container } from "../model/Container";
import { Layout } from "./Layout";
export interface ContainerView extends GenericView {
    softwareSystemIdentifier: Identifier;
    containers?: Container[];
    people?: Person[];
    softwareSystems?: SoftwareSystem[];
}
export declare function containerView(softwareSystemIdentifier: Identifier, key?: string, title?: string, layout?: Layout, description?: string, containers?: Container[], people?: Person[], softwareSystems?: SoftwareSystem[]): ContainerView;
//# sourceMappingURL=ContainerView.d.ts.map