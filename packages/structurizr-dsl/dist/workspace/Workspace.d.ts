import { Identifier } from "../model/Identifier";
import { Properties } from "../model/Properties";
import { Model } from "./Model";
import { Views } from "./Views";
export interface Workspace {
    name?: string;
    description?: string;
    lastModifiedData?: Date;
    properties?: Properties;
    model: Model;
    views: Views;
}
export declare function toWorkspaceString(workspace: Workspace): string;
export declare function workspace(name: string, description: string, model: Model, views: Views): Workspace;
export declare const findSoftwareSystem: (workspace: Workspace, identifier: Identifier) => import("..").SoftwareSystem;
export declare const findContainer: (workspace: Workspace, identifier: Identifier) => import("..").Container;
export declare const findComponent: (workspace: Workspace, identifier: Identifier) => import("..").Component;
//# sourceMappingURL=Workspace.d.ts.map