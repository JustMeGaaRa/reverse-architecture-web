import { IObservable, ISupportSnapshot, IViews } from "@structurizr/dsl";
import * as Y from "yjs";
import { ComponentView } from "./ComponentView";
import { Configuration } from "./Configuration";
import { ContainerView } from "./ContainerView";
import { DeploymentView } from "./DeploymentView";
import { SystemContextView } from "./SystemContextView";
import { SystemLandscapeView } from "./SystemLandscapeView";

export class Views implements ISupportSnapshot<IViews>, IObservable {
    private get systemLandscapeArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemLandscapeViews") as Y.Array<Y.Map<unknown>>; }
    private get systemContextsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("systemContextViews") as Y.Array<Y.Map<unknown>>; }
    private get containersArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("containerViews") as Y.Array<Y.Map<unknown>>; }
    private get componentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("componentViews") as Y.Array<Y.Map<unknown>>; }
    private get deploymentsArray(): Y.Array<Y.Map<unknown>> { return this.propertiesMap.get("deploymentViews") as Y.Array<Y.Map<unknown>>; }
    private get configurationMap(): Y.Map<unknown> { return this.propertiesMap.get("configuration") as Y.Map<unknown>; }

    constructor(private readonly propertiesMap: Y.Map<unknown>) {
        if (!propertiesMap.has("systemLandscapeViews")) propertiesMap.set("systemLandscapeViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("systemContextViews")) propertiesMap.set("systemContextViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("containerViews")) propertiesMap.set("containerViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("componentViews")) propertiesMap.set("componentViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("deploymentViews")) propertiesMap.set("deploymentViews", new Y.Array<Y.Map<unknown>>());
        if (!propertiesMap.has("configuration")) propertiesMap.set("configuration", new Y.Map<unknown>());
    }

    public get systemLandscape(): Array<SystemLandscapeView> { return this.systemLandscapeArray?.map(view => new SystemLandscapeView(view)); }
    public get systemContexts(): Array<SystemContextView> { return this.systemContextsArray?.map(view => new SystemContextView(view)); }
    public get containers(): Array<ContainerView> { return this.containersArray?.map(view => new ContainerView(view)); }
    public get components(): Array<ComponentView> { return this.componentsArray?.map(view => new ComponentView(view)); }
    public get deployments(): Array<DeploymentView> { return this.deploymentsArray?.map(view => new DeploymentView(view)); }
    public get configuration(): Configuration { return new Configuration(this.configurationMap); }

    public fromSnapshot(views: IViews) {
    }

    public toSnapshot(): IViews {
        return Object.freeze({
            systemLandscape: this.systemLandscape?.map(view => view.toSnapshot()) ?? [],
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
}