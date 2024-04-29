import {
    IObservable,
    ISupportSnapshot,
    IViews
} from "@structurizr/dsl";
import * as Y from "yjs";
import { ComponentView } from "./ComponentView";
import { Configuration } from "./Configuration";
import { ContainerView } from "./ContainerView";
import { DeploymentView } from "./DeploymentView";
import { Model } from "./Model";
import { Properties } from "./Properties";
import { SystemContextView } from "./SystemContextView";
import { SystemLandscapeView } from "./SystemLandscapeView";
import {
    createComponentViewPropertiesMap,
    createContainerViewPropertiesMap,
    createDeploymentViewPropertiesMap,
    createSoftwareContextViewPropertiesMap,
    createSystemLandscapeViewPropertiesMap
} from "./utils";

export class Views implements ISupportSnapshot<IViews>, IObservable {
    private get systemLandscapeMap(): Y.Map<unknown> { return this.propertiesMap.get("systemLandscapeViews") as Y.Map<unknown>; }
    private get systemContextsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemContextViews") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerViews") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("componentViews") as Y.Array<Y.Map<unknown>>; }
    private get deploymentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentViews") as Y.Array<Y.Map<unknown>>; }

    constructor(
        private readonly propertiesMap: Y.Map<unknown>,
        private readonly model: Model
    ) { }

    public get systemLandscape(): SystemLandscapeView { return this.systemLandscapeMap && new SystemLandscapeView(this.systemLandscapeMap, this.model); }
    public get systemContexts(): Array<SystemContextView> { return this.systemContextsArray?.map(view => new SystemContextView(view)) ?? []; }
    public get containers(): Array<ContainerView> { return this.containersArray?.map(view => new ContainerView(view)) ?? []; }
    public get components(): Array<ComponentView> { return this.componentsArray?.map(view => new ComponentView(view)) ?? []; }
    public get deployments(): Array<DeploymentView> { return this.deploymentsArray?.map(view => new DeploymentView(view)) ?? []; }
    public get configuration(): Configuration { return this.propertiesMap && new Configuration(this.propertiesMap); }

    public fromSnapshot(views: IViews) {
        if (views.systemLandscape !== null && views.systemLandscape !== undefined) {
            this.setSystemLandscape().fromSnapshot(views.systemLandscape);
        }
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
        const systemLandscapeMap = createSystemLandscapeViewPropertiesMap();
        this.propertiesMap.set("systemLandscapeViews", systemLandscapeMap);
        return new SystemLandscapeView(systemLandscapeMap, this.model);
    }

    public addSystemContext() {
        if (!this.propertiesMap.has("systemContextViews")) this.propertiesMap.set("systemContextViews", new Y.Array<Y.Map<unknown>>());
        const systemContextMap = createSoftwareContextViewPropertiesMap();
        this.systemContextsArray.push([systemContextMap]);
        return new SystemContextView(systemContextMap);
    }

    public addContainer() {
        if (!this.propertiesMap.has("containerViews")) this.propertiesMap.set("containerViews", new Y.Array<Y.Map<unknown>>());
        const containerViewMap = createContainerViewPropertiesMap();
        this.containersArray.push([containerViewMap]);
        return new ContainerView(containerViewMap);
    }

    public addComponent() {
        if (!this.propertiesMap.has("componentViews")) this.propertiesMap.set("componentViews", new Y.Array<Y.Map<unknown>>());
        const componentViewMap = createComponentViewPropertiesMap();
        this.componentsArray.push([componentViewMap]);
        return new ComponentView(componentViewMap);
    }

    public addDeployment() {
        if (!this.propertiesMap.has("deploymentViews")) this.propertiesMap.set("deploymentViews", new Y.Array<Y.Map<unknown>>());
        const deploymentViewMap = createDeploymentViewPropertiesMap();
        this.deploymentsArray.push([deploymentViewMap]);
        return new DeploymentView(deploymentViewMap);
    }
}