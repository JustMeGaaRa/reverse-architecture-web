import { Identifier, Workspace } from "..";
import { Action } from "./Action";
import { ElementDimensions } from "./ElementDimensions";

export type WorkspaceActions = {
    setWorkspace: Action<Workspace>;
    setName: Action<string>;
    addPerson: Action<Identifier>;
    addSoftwareSystem: Action<Identifier>;
    addContainer: Action<Identifier>;
    addComponent: Action<Identifier>;
    addDeploymentEnvironment: Action<Identifier>;
    addDeploymentNode: Action<Identifier>;
    setElementDimensions: Action<ElementDimensions>;
};
