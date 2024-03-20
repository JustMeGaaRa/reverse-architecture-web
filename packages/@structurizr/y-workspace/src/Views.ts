import { IObservable, ISupportSnapshot, IViews } from "@structurizr/dsl";
import * as Y from "yjs";
import { v4 } from "uuid";
import { ComponentView } from "./ComponentView";
import { Configuration } from "./Configuration";
import { ContainerView } from "./ContainerView";
import { DeploymentView } from "./DeploymentView";
import { SystemContextView } from "./SystemContextView";
import { SystemLandscapeView } from "./SystemLandscapeView";

export class Views implements ISupportSnapshot<IViews>, IObservable {
    private get systemLandscapeMap(): Y.Map<unknown> { return this.propertiesMap.get("systemLandscapeViews") as Y.Map<unknown>; }
    private get systemContextsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemContextViews") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerViews") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("componentViews") as Y.Array<Y.Map<unknown>>; }
    private get deploymentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentViews") as Y.Array<Y.Map<unknown>>; }
    private get configurationMap(): Y.Map<unknown> { return this.propertiesMap.get("configuration") as Y.Map<unknown>; }

    constructor(private readonly propertiesMap: Y.Map<unknown>) {
        if (!this.propertiesMap.has("configuration")) this.propertiesMap.set("configuration", new Y.Map<unknown>());
    }

    public get systemLandscape(): SystemLandscapeView { return new SystemLandscapeView(this.systemLandscapeMap); }
    public get systemContexts(): Array<SystemContextView> { return this.systemContextsArray?.map(view => new SystemContextView(view)); }
    public get containers(): Array<ContainerView> { return this.containersArray?.map(view => new ContainerView(view)); }
    public get components(): Array<ComponentView> { return this.componentsArray?.map(view => new ComponentView(view)); }
    public get deployments(): Array<DeploymentView> { return this.deploymentsArray?.map(view => new DeploymentView(view)); }
    public get configuration(): Configuration { return new Configuration(this.configurationMap); }

    public fromSnapshot(views: IViews) {
        views.systemLandscape && this.setSystemLandscape().fromSnapshot(views.systemLandscape);
        views.systemContexts?.forEach(view => this.addSystemContext().fromSnapshot(view));
        views.containers?.forEach(view => this.addContainer().fromSnapshot(view));
        views.components?.forEach(view => this.addComponent().fromSnapshot(view));
        views.deployments?.forEach(view => this.addDeployment().fromSnapshot(view));
        this.configuration.fromSnapshot(views.configuration);
    }

    public toSnapshot(): IViews {
        return Object.freeze({
            systemLandscape: this.systemLandscape?.toSnapshot(),
            systemContexts: this.systemContexts?.map(view => view.toSnapshot()) ?? [],
            containers: this.containers?.map(view => view.toSnapshot()) ?? [],
            components: this.components?.map(view => view.toSnapshot()) ?? [],
            deployments: this.deployments?.map(view => view.toSnapshot()) ?? [],
            configuration: this.configuration.toSnapshot()
        })
    }

    public subscribe(observer: () => void): void {
        this.propertiesMap.observeDeep(observer);
    }

    public unsubscribe(observer: () => void): void {
        this.propertiesMap.unobserveDeep(observer);
    }

    public setSystemLandscape() {
        if (!this.propertiesMap.has("systemLandscapeViews")) this.propertiesMap.set("systemLandscapeViews", new Y.Map<unknown>());
        const uniqueId = new String(v4()).substring(0, 8);
        const systemLandscapeMap = new Y.Map([
            ["identifier", `systemLandscape-${uniqueId}`],
            ["name", "System Landscape"],
            ["description", ""],
            ["softwareSystem", ""],
            ["elements", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.propertiesMap.set("systemLandscapeViews", systemLandscapeMap);
        return new SystemLandscapeView(systemLandscapeMap);
    }

    public addSystemContext() {
        if (!this.propertiesMap.has("systemContextViews")) this.propertiesMap.set("systemContextViews", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const systemContextMap = new Y.Map([
            ["identifier", `systemContext-${uniqueId}`],
            ["name", "System Context"],
            ["description", ""],
            ["softwareSystem", ""],
            ["elements", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.systemContextsArray.push([systemContextMap]);
        return new SystemContextView(systemContextMap);
    }

    public addContainer() {
        if (!this.propertiesMap.has("containerViews")) this.propertiesMap.set("containerViews", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const containerViewMap = new Y.Map([
            ["identifier", `container-${uniqueId}`],
            ["name", "Container"],
            ["description", ""],
            ["softwareSystem", ""],
            ["elements", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.containersArray.push([containerViewMap]);
        return new ContainerView(containerViewMap);
    }

    public addComponent() {
        if (!this.propertiesMap.has("componentViews")) this.propertiesMap.set("componentViews", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const componentViewMap = new Y.Map([
            ["identifier", `component-${uniqueId}`],
            ["name", "Component"],
            ["description", ""],
            ["softwareSystem", ""],
            ["elements", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.componentsArray.push([componentViewMap]);
        return new ComponentView(componentViewMap);
    }

    public addDeployment() {
        if (!this.propertiesMap.has("deploymentViews")) this.propertiesMap.set("deploymentViews", new Y.Array<Y.Map<unknown>>());
        const uniqueId = new String(v4()).substring(0, 8);
        const deploymentViewMap = new Y.Map([
            ["identifier", `deployment-${uniqueId}`],
            ["name", "Deployment"],
            ["description", ""],
            ["softwareSystem", ""],
            ["elements", new Y.Array<Y.Map<unknown>>()]
        ]);
        this.deploymentsArray.push([deploymentViewMap]);
        return new DeploymentView(deploymentViewMap);
    }
}