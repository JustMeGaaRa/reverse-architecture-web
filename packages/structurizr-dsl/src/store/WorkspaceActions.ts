import {
    Component,
    Container,
    DeploymentEnvironment,
    DeploymentNode,
    Identifier,
    Person,
    Relationship,
    SoftwareSystem,
    Workspace
} from "..";

export type WorkspaceActions = {
    setWorkspace: Action<Workspace>;
    setName: Action<string>;
    addPerson: Action<Person>;
    addSoftwareSystem: Action<SoftwareSystem>;
    addContainer: Action<ContainerParams>;
    addComponent: Action<ComponentParams>;
    addDeploymentEnvironment: Action<DeploymentEnvironment>;
    addDeploymentNode: Action<DeploymentNodeParams>;
    addRelationship: Action<Relationship>;
    setLayoutElement: Action<LayoutElementParams>;
};

export type Action<TParam> = (param: TParam) => void;

export type Func<TParam, TResult> = (param: TParam) => TResult;

export type ContainerParams = {
    softwareSystemIdentifier: Identifier;
    container: Container;
}

export type ComponentParams = {
    softwareSystemIdentifier: Identifier;
    containerIdentifier: Identifier;
    component: Component;
}

export type DeploymentNodeParams = {
    softwareSystemIdentifier: Identifier;
    environment: string;
    deploymentNode: DeploymentNode;
};

export type LayoutElementParams = {
    viewIdentifier: Identifier;
    elementIdentifier: Identifier;
    x: number;
    y: number;
    width: number;
    height: number;
};