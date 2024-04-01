import { All, Identifier, IElementPosition, IRelationshipPosition, ISupportSnapshot, ISystemContextView, Position, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";
import { AutoLayout } from "./AutoLayout";
import { Animation } from "./Animation";
import { Properties } from "./Properties";
import { createAnimationPropertiesMap, createAutoLayoutPropertiesMap } from "./utils";

export class SystemContextView implements ISupportSnapshot<ISystemContextView> {
    private get autoLayoutMap(): Y.Map<unknown> { return this.propertiesMap.get("autoLayout") as Y.Map<unknown>; }
    private get animationMap(): Y.Map<unknown> { return this.propertiesMap.get("animation") as Y.Map<unknown>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get type(): ViewType { return ViewType.SystemContext; }

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public set softwareSystemIdentifier(value: Identifier) { this.propertiesMap.set("softwareSystemIdentifier", value); }
    public get softwareSystemIdentifier(): Identifier { return this.propertiesMap.get("softwareSystemIdentifier") as Identifier; }
    
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

    public fromSnapshot(systemContextView: ISystemContextView) {
        this.identifier = systemContextView.identifier;
        this.softwareSystemIdentifier = systemContextView.softwareSystemIdentifier;
        this.key = systemContextView.key;
        this.description = systemContextView.description;
        this.include = systemContextView.include;
        this.exclude = systemContextView.exclude;
        this.title = systemContextView.title;
        this.elements = systemContextView.elements;
        this.relationships = systemContextView.relationships;

        if (systemContextView.autoLayout) {
            const autoLayoutMap = createAutoLayoutPropertiesMap();
            this.propertiesMap.set("autoLayout", autoLayoutMap);
            this.autoLayout.fromSnapshot(systemContextView.autoLayout);
        }

        if (systemContextView.animation) {
            const animationMap = createAnimationPropertiesMap();
            this.propertiesMap.set("animation", animationMap);
            this.animation.fromSnapshot(systemContextView.animation);
        }

        systemContextView.properties && this.properties.fromSnapshot(systemContextView.properties);
    }

    public toSnapshot(): ISystemContextView {
        return Object.freeze({
            type: this.type,
            identifier: this.identifier,
            softwareSystemIdentifier: this.softwareSystemIdentifier,
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

    public includeElement(identifier: Identifier, position?: Position) {
        // const group = this.model.addGroup();
        throw new Error("Method not implemented.");
    }
}
