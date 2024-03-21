import { All, Identifier, IDeploymentView, IElementPosition, IRelationshipPosition, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";
import { AutoLayout } from "./AutoLayout";
import { Animation } from "./Animation";
import { Properties } from "./Properties";

export class DeploymentView implements ISupportSnapshot<IDeploymentView> {
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Deployment;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public set softwareSystemIdentifier(value: Identifier) { this.propertiesMap.set("softwareSystemIdentifier", value); }
    public get softwareSystemIdentifier(): Identifier { return this.propertiesMap.get("softwareSystemIdentifier") as Identifier; }

    public get environment(): string { return this.propertiesMap.get("environment") as string; }
    public set environment(value: string) { this.propertiesMap.set("environment", value); }

    public get key(): string { return this.propertiesMap.get("key") as string; }
    public set key(value: string) { this.propertiesMap.set("key", value); }

    public get title(): string { return this.propertiesMap.get("title") as string; }
    public set title(value: string) { this.propertiesMap.set("title", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get include(): Array<Identifier | All> { return this.propertiesMap.get("include") as Array<Identifier | All>; }
    public set include(value: Array<Identifier | All>) { this.propertiesMap.set("include", value); }

    public get exclude(): Array<Identifier> { return this.propertiesMap.get("exclude") as Array<Identifier>; }
    public set exclude(value: Array<Identifier>) { this.propertiesMap.set("exclude", value); }
    
    public get elements(): Array<IElementPosition> { return this.propertiesMap.get("elements") as Array<IElementPosition>; }
    public set elements(value: Array<IElementPosition>) { this.propertiesMap.set("elements", value); }
    
    public get relationships(): Array<IRelationshipPosition> { return this.propertiesMap.get("relationships") as Array<IRelationshipPosition>; }
    public set relationships(value: Array<IRelationshipPosition>) { this.propertiesMap.set("relationships", value); }

    public get autoLayout(): AutoLayout { return this.autoLayoutMap && new AutoLayout(this.autoLayoutMap); }
    public get animation(): Animation { return this.animationMap && new Animation(this.animationMap); }
    public get properties(): Properties { return new Properties(this.propertiesMap.get("properties") as Y.Map<unknown>); }

    public fromSnapshot(deploymentView: IDeploymentView) {
        this.identifier = deploymentView.identifier;
        this.softwareSystemIdentifier = deploymentView.softwareSystemIdentifier;
        this.environment = deploymentView.environment;
        this.key = deploymentView.key;
        this.description = deploymentView.description;
        this.include = deploymentView.include;
        this.exclude = deploymentView.exclude;
        this.title = deploymentView.title;
        this.elements = deploymentView.elements;
        this.relationships = deploymentView.relationships;
        deploymentView.autoLayout && this.autoLayout.fromSnapshot(deploymentView.autoLayout);
        deploymentView.animation && this.animation.fromSnapshot(deploymentView.animation);
        deploymentView.properties && this.properties.fromSnapshot(deploymentView.properties);
    }

    public toSnapshot(): IDeploymentView {
        return Object.freeze({
            type: this.type,
            identifier: this.identifier,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
            environment: this.environment,
            key: this.key,
            title: this.title,
            description: this.description,
            include: this.include,
            exclude: this.exclude,
            elements: this.elements,
            relationships: this.relationships,
            autoLayout: this.autoLayout?.toSnapshot(),
            animation: this.animation?.toSnapshot(),
            properties: this.properties.toSnapshot(),
        });
    }
}
