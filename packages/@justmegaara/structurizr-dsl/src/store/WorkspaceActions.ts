import {
    Component,
    Container,
    DeploymentEnvironment,
    DeploymentNode,
    Identifier,
    Person,
    Position,
    Relationship,
    Size,
    SoftwareSystem,
    Workspace
} from "..";

export type WorkspaceActions = {
    setWorkspace: Action<Workspace>;
    setName: Action<string>;
    addPerson: Action<PersonParams>;
    addSoftwareSystem: Action<SoftwareSystemParams>;
    addContainer: Action<ContainerParams>;
    addComponent: Action<ComponentParams>;
    addDeploymentEnvironment: Action<DeploymentEnvironmentParams>;
    addDeploymentNode: Action<DeploymentNodeParams>;
    addRelationship: Action<Relationship>;
    setElementDimension: Action<LayoutElementParams>;
};

export type Action<TParam> = (param: TParam) => void;

export type Func<TParam, TResult> = (param: TParam) => TResult;

export type PersonParams = {
    person: Person;
    position: Position;
}

export type SoftwareSystemParams = {
    softwareSystem: SoftwareSystem;
    position: Position;
}

export type ContainerParams = {
    softwareSystemIdentifier: Identifier;
    container: Container;
    position: Position;
}

export type ComponentParams = {
    softwareSystemIdentifier: Identifier;
    containerIdentifier: Identifier;
    component: Component;
    position: Position;
}

export type DeploymentEnvironmentParams = {
    deploymentEnvironment: DeploymentEnvironment;
}

export type DeploymentNodeParams = {
    softwareSystemIdentifier: Identifier;
    environment: string;
    deploymentNode: DeploymentNode;
    position: Position;
};

export type LayoutElementParams = {
    viewIdentifier: Identifier;
    elementIdentifier: Identifier;
    position: Position;
    size: Size;
};