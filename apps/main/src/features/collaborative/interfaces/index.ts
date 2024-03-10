export interface ISupportSnapshot<T> {
    toSnapshot(): T;
}

export interface IWorkspaceSnapshot {
    version: number;
    name?: string;
    description?: string;
    lastModifiedDate?: string;
    properties?: IProperties;
    model: IModel;
    views: IViews;
}

export interface IModel {
    // people: IPerson[];
    // softwareSystems: ISoftwareSystem[];
    // deploymentEnvironments: IDeploymentEnvironment[];
    // relationships: IRelationship[];
    // groups: IGroup[];
}

export interface IPerson {
}

export interface ISoftwareSystem {
}

export interface IContainer {
}

export interface IComponent {
}

export interface IDeploymentEnvironment {
}

export interface IRelationship {
}

export interface IGroup {
}

export interface ISystemLandscapeView {
}

export interface ISystemContextView {
}

export interface IContainerView {
}

export interface IComponentView {
}

export interface IDeploymentView {
}

export interface IConfiguration {
}

export interface IViews {
    // systemLandscape?: ISystemLandscapeView[];
    // systemContexts: ISystemContextView[];
    // containers: IContainerView[];
    // components: IComponentView[];
    // deployments: IDeploymentView[];
    // configuration: IConfiguration;
}

export interface IWorkspaceMetadata {

}

export interface IProperties {

}