import {
    Component,
    Container,
    DeploymentEnvironment,
    DeploymentNode,
    GenericView,
    Identifier,
    Person,
    Position,
    Relationship,
    Size,
    SoftwareSystem,
    ViewPath,
    Workspace,
} from "@justmegaara/structurizr-dsl";

export type WorkspaceActions = {
    setWorkspace: Action<Workspace>;
    setSelectedView: Action<GenericView>;
    setViewPath: Action<ViewPath>;
    setElementDimension: Action<LayoutElementParams>;
    setName: Action<string>;
    addPerson: Action<PersonParams>;
    addSoftwareSystem: Action<SoftwareSystemParams>;
    addContainer: Action<ContainerParams>;
    addComponent: Action<ComponentParams>;
    addDeploymentEnvironment: Action<DeploymentEnvironmentParams>;
    addDeploymentNode: Action<DeploymentNodeParams>;
    addRelationship: Action<Relationship>;
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